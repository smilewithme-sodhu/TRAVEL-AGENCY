/**
 * BookingStateMachine.ts
 *
 * Production-grade Finite State Machine enforcing all 11 booking lifecycle
 * states defined in Project 1 Blueprint — Section 10.
 *
 * INVARIANTS ENFORCED:
 *  1. Every transition is validated against the static transition matrix before
 *     any DB write occurs. Invalid transitions throw InvalidStateTransitionError.
 *  2. Every state mutation is wrapped in a Prisma interactive transaction.
 *     The AuditLog entry and the Booking status update are written atomically.
 *  3. Payment webhooks are verified via SHA-256 HMAC before any state change.
 *     Duplicate webhooks (same gatewayOrderId) are silently idempotent.
 *  4. On BOOKING_CONFIRMED, PENDING RewardLedger entries are created atomically
 *     inside the same transaction as the status update. A domain event is then
 *     emitted AFTER the transaction commits (outbox pattern safety: event is
 *     only emitted when the DB write has fully succeeded).
 *
 * @module booking/BookingStateMachine
 */

import crypto from "crypto";
import { EventEmitter } from "events";
import {
  PrismaClient,
  BookingStatus,
  AuditAction,
  TransactionType,
  TransactionStatus,
  RewardType,
  Booking,
  Prisma,
} from "@prisma/client";

// ---------------------------------------------------------------------------
// Re-export Prisma enum for consumer convenience
// ---------------------------------------------------------------------------
export { BookingStatus };

// ===========================================================================
// SECTION 1 — CUSTOM ERROR CLASSES
// ===========================================================================

/**
 * Thrown when a caller attempts a state transition that is not permitted
 * by the FSM transition matrix for the current booking status.
 */
export class InvalidStateTransitionError extends Error {
  public readonly currentStatus: BookingStatus;
  public readonly targetStatus: BookingStatus;
  public readonly bookingId: string;

  constructor(
    bookingId: string,
    currentStatus: BookingStatus,
    targetStatus: BookingStatus
  ) {
    super(
      `Invalid state transition on booking "${bookingId}": ` +
        `${currentStatus} → ${targetStatus} is not permitted.`
    );
    this.name = "InvalidStateTransitionError";
    this.currentStatus = currentStatus;
    this.targetStatus = targetStatus;
    this.bookingId = bookingId;
    Object.setPrototypeOf(this, InvalidStateTransitionError.prototype);
  }
}

/**
 * Thrown when an inbound payment webhook fails HMAC signature verification.
 * This indicates a forged or tampered request and must be treated as a
 * security event — the caller should respond with HTTP 400 and log the attempt.
 */
export class WebhookSignatureVerificationError extends Error {
  public readonly gatewayOrderId: string | undefined;

  constructor(message: string, gatewayOrderId?: string) {
    super(message);
    this.name = "WebhookSignatureVerificationError";
    this.gatewayOrderId = gatewayOrderId;
    Object.setPrototypeOf(this, WebhookSignatureVerificationError.prototype);
  }
}

/**
 * Thrown when a referenced Booking row does not exist in the database.
 */
export class BookingNotFoundError extends Error {
  public readonly bookingId: string;

  constructor(bookingId: string) {
    super(`Booking "${bookingId}" was not found.`);
    this.name = "BookingNotFoundError";
    this.bookingId = bookingId;
    Object.setPrototypeOf(this, BookingNotFoundError.prototype);
  }
}

// ===========================================================================
// SECTION 2 — DOMAIN EVENT TYPES
// ===========================================================================

export interface BookingStateChangedEvent {
  bookingId: string;
  bookingRef: string;
  previousStatus: BookingStatus;
  newStatus: BookingStatus;
  actorId: string;
  occurredAt: Date;
  metadata?: Record<string, unknown>;
}

export interface BookingConfirmedEvent extends BookingStateChangedEvent {
  customerId: string;
  memberId: string | null;
  sellingPrice: Prisma.Decimal;
  grossContribution: Prisma.Decimal;
  directRewardBudget: Prisma.Decimal;
  teamRewardBudget: Prisma.Decimal;
  binaryVolumeBudget: Prisma.Decimal;
}

export interface BookingCancelledEvent extends BookingStateChangedEvent {
  cancellationReason: string | undefined;
}

export interface BookingCompletedEvent extends BookingStateChangedEvent {
  completedAt: Date;
}

// Typed event map for the domain event emitter
export interface BookingEventMap {
  BOOKING_STATE_CHANGED: [BookingStateChangedEvent];
  BOOKING_CONFIRMED: [BookingConfirmedEvent];
  BOOKING_CANCELLED: [BookingCancelledEvent];
  BOOKING_COMPLETED: [BookingCompletedEvent];
}

// ===========================================================================
// SECTION 3 — FSM TRANSITION MATRIX
// ===========================================================================

/**
 * Authoritative lookup table of all permitted state transitions.
 *
 * Reading: TRANSITIONS[currentStatus] = [list of valid next statuses]
 *
 * Transitions NOT in this table are ILLEGAL and will throw
 * InvalidStateTransitionError before touching the database.
 *
 * Terminal states (COMPLETED, REFUNDED) have empty arrays —
 * no further transitions are permitted once reached.
 */
export const TRANSITIONS: Readonly<Record<BookingStatus, readonly BookingStatus[]>> = {
  [BookingStatus.QUOTE_REQUESTED]: [
    BookingStatus.QUOTE_CREATED,
    BookingStatus.CANCELLED,
  ],
  [BookingStatus.QUOTE_CREATED]: [
    BookingStatus.PAYMENT_PENDING,
    BookingStatus.CANCELLED,
  ],
  [BookingStatus.PAYMENT_PENDING]: [
    BookingStatus.PAYMENT_RECEIVED,
    BookingStatus.CANCELLED,
  ],
  [BookingStatus.PAYMENT_RECEIVED]: [
    BookingStatus.BOOKING_CONFIRMED,
    BookingStatus.CANCELLED,
    BookingStatus.REFUND_PROCESS, // Payment received but booking cannot be confirmed
  ],
  [BookingStatus.BOOKING_CONFIRMED]: [
    BookingStatus.TRAVEL_UPCOMING,
    BookingStatus.CANCELLED,
  ],
  [BookingStatus.TRAVEL_UPCOMING]: [
    BookingStatus.TRAVELING,
    BookingStatus.CANCELLED,
  ],
  [BookingStatus.TRAVELING]: [
    BookingStatus.COMPLETED,
    BookingStatus.CANCELLED, // Emergency cancellation mid-travel
  ],
  [BookingStatus.COMPLETED]: [],           // Terminal — no further transitions
  [BookingStatus.CANCELLED]: [
    BookingStatus.REFUND_PROCESS,          // Post-cancellation refund initiation
  ],
  [BookingStatus.REFUND_PROCESS]: [
    BookingStatus.REFUNDED,
  ],
  [BookingStatus.REFUNDED]: [],            // Terminal — no further transitions
} as const;

// ===========================================================================
// SECTION 4 — WEBHOOK PAYLOAD SHAPE
// ===========================================================================

/**
 * Normalised payment webhook payload. Gateway-specific adapters should
 * transform raw payloads into this shape before calling handlePaymentWebhook.
 */
export interface NormalisedPaymentWebhook {
  /** Gateway's own unique order identifier — used as idempotency key */
  gatewayOrderId: string;
  /** Gateway's payment transaction identifier (assigned after success/failure) */
  gatewayPaymentId: string;
  /** Gateway-reported payment status */
  event: "PAYMENT_SUCCESS" | "PAYMENT_FAILED" | "PAYMENT_REFUNDED";
  /** Amount in smallest currency unit (paise for INR) */
  amountInSmallestUnit: number;
  currency: string;
  /** ISO-8601 timestamp when the event occurred at the gateway */
  gatewayTimestamp: string;
  /** Raw signature header value from the gateway request */
  signature: string;
}

// ===========================================================================
// SECTION 5 — SERVICE CLASS
// ===========================================================================

export class BookingStateMachineService {
  /**
   * Typed domain event emitter. Consumers subscribe to specific event names.
   * Events are only emitted AFTER the wrapping DB transaction has committed.
   */
  public readonly events = new EventEmitter() as EventEmitter & {
    emit<K extends keyof BookingEventMap>(
      event: K,
      ...args: BookingEventMap[K]
    ): boolean;
    on<K extends keyof BookingEventMap>(
      event: K,
      listener: (...args: BookingEventMap[K]) => void
    ): EventEmitter;
  };

  constructor(private readonly prisma: PrismaClient) {}

  // =========================================================================
  // PUBLIC: transition
  // =========================================================================

  /**
   * Validate and execute a booking state transition.
   *
   * Execution sequence (all DB writes inside a single interactive transaction):
   *  1. Fetch booking row WITH a row-level lock (SELECT ... FOR UPDATE) to
   *     prevent concurrent race conditions on the same booking.
   *  2. Validate the target transition against the FSM matrix.
   *  3. Update Booking.status and any ancillary timestamp fields.
   *  4. Write an immutable AuditLog row.
   *  5. If targetStatus === BOOKING_CONFIRMED, atomically create PENDING
   *     reward ledger seeds (one per reward type that has a non-zero budget).
   *  6. Commit the transaction.
   *  7. Emit domain event(s) on the in-process event bus.
   *
   * @param bookingId    UUID of the booking to transition.
   * @param targetStatus The desired next BookingStatus.
   * @param actorId      User.id of the human or system performing this action.
   * @param metadata     Optional context object stored in AuditLog.metadata.
   * @param cancellationReason  Required when targetStatus === CANCELLED.
   * @returns The updated Booking row after the transaction commits.
   * @throws BookingNotFoundError       if the booking does not exist.
   * @throws InvalidStateTransitionError if the transition is not permitted.
   */
  async transition(
    bookingId: string,
    targetStatus: BookingStatus,
    actorId: string,
    metadata?: Record<string, unknown>,
    cancellationReason?: string
  ): Promise<Booking> {
    const updatedBooking = await this.prisma.$transaction(
      async (tx) => {
        // ------------------------------------------------------------------
        // Step 1: Lock the booking row to prevent concurrent modifications.
        // Prisma does not expose FOR UPDATE natively; we use $queryRaw.
        // ------------------------------------------------------------------
        const locked = await tx.$queryRaw<Booking[]>`
          SELECT * FROM bookings
          WHERE id = ${bookingId}::uuid
          FOR UPDATE
        `;

        if (!locked || locked.length === 0) {
          throw new BookingNotFoundError(bookingId);
        }

        const booking = locked[0];
        const currentStatus = booking.status as BookingStatus;

        // ------------------------------------------------------------------
        // Step 2: FSM validation.
        // ------------------------------------------------------------------
        this.assertTransitionAllowed(bookingId, currentStatus, targetStatus);

        // ------------------------------------------------------------------
        // Step 3: Build the Prisma update data object.
        // ------------------------------------------------------------------
        const now = new Date();
        const updateData: Prisma.BookingUpdateInput = {
          status: targetStatus,
        };

        switch (targetStatus) {
          case BookingStatus.BOOKING_CONFIRMED:
            updateData.confirmedAt = now;
            break;
          case BookingStatus.TRAVELING:
            updateData.travelStartedAt = now;
            break;
          case BookingStatus.COMPLETED:
            updateData.completedAt = now;
            break;
          case BookingStatus.CANCELLED:
            updateData.cancelledAt = now;
            if (cancellationReason) {
              updateData.cancellationReason = cancellationReason;
            }
            break;
          default:
            break;
        }

        const updated = await tx.booking.update({
          where: { id: bookingId },
          data: updateData,
        });

        // ------------------------------------------------------------------
        // Step 4: Write immutable AuditLog row.
        // ------------------------------------------------------------------
        await tx.auditLog.create({
          data: {
            actorId,
            action: AuditAction.BOOKING_STATE_CHANGE,
            entity: "bookings",
            entityId: bookingId,
            previousState: { status: currentStatus },
            newState: { status: targetStatus },
            metadata: (metadata ?? Prisma.JsonNull) as Prisma.InputJsonValue,
            occurredAt: now,
          },
        });

        // ------------------------------------------------------------------
        // Step 5: On BOOKING_CONFIRMED — seed pending reward ledger entries.
        // These are the "promise" entries that will be released to AVAILABLE
        // when the booking reaches COMPLETED.
        // ------------------------------------------------------------------
        if (targetStatus === BookingStatus.BOOKING_CONFIRMED) {
          await this.seedPendingRewardLedgerEntries(tx, updated, actorId);
          
          if (updated.memberId) {
            await tx.member.update({
              where: { id: updated.memberId },
              data: {
                greenStatus: "GREEN",
                greenActivatedAt: now,
                greenExpiresAt: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000), 
              }
            });
          }
        }

        // ------------------------------------------------------------------
        // Step 6: On COMPLETED — mark all PENDING reward ledger entries for
        // this booking as AVAILABLE so they can be withdrawn.
        // ------------------------------------------------------------------
        if (targetStatus === BookingStatus.COMPLETED) {
          await this.releaseRewardLedgerEntries(tx, bookingId, now);
        }

        // ------------------------------------------------------------------
        // Step 7: On CANCELLED / REFUNDED — freeze or reverse pending ledger.
        // ------------------------------------------------------------------
        if (
          targetStatus === BookingStatus.CANCELLED ||
          targetStatus === BookingStatus.REFUNDED
        ) {
          await this.reverseRewardLedgerEntries(
            tx,
            bookingId,
            actorId,
            cancellationReason ?? `Booking ${targetStatus.toLowerCase()}`
          );
        }

        return updated;
      },
      {
        // Serializable isolation prevents phantom reads on concurrent transitions.
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000,  // ms to wait for transaction slot
        timeout: 10000, // ms max execution time
      }
    );

    // -----------------------------------------------------------------------
    // Step 8: Emit domain events AFTER the transaction has fully committed.
    // This ensures downstream consumers never process an event for a state
    // change that was ultimately rolled back.
    // -----------------------------------------------------------------------
    this.emitStateChangedEvent(updatedBooking, targetStatus, actorId, metadata);

    return updatedBooking;
  }

  // =========================================================================
  // PUBLIC: handlePaymentWebhook
  // =========================================================================

  /**
   * Idempotent payment webhook consumer.
   *
   * Security pipeline:
   *  1. Verify HMAC-SHA256 signature. Throws WebhookSignatureVerificationError
   *     if invalid — caller MUST return HTTP 400.
   *  2. Look up the Payment row by gatewayOrderId.
   *  3. If the Payment is already in SUCCESS or FAILED state, return
   *     immediately without further DB writes (idempotency).
   *  4. Update Payment row inside a transaction.
   *  5. If PAYMENT_SUCCESS: transition the associated Booking from
   *     PAYMENT_PENDING → PAYMENT_RECEIVED.
   *  6. Store the raw webhook payload for audit.
   *
   * @param rawBody   The raw request body string (before JSON parsing).
   *                  Must be the exact bytes received — not re-serialised JSON.
   * @param signature The gateway-provided HMAC signature header value.
   * @param secret    The webhook secret shared with the payment gateway.
   * @returns Object with success flag and the resolved bookingId.
   * @throws WebhookSignatureVerificationError on tampered/invalid signature.
   */
  async handlePaymentWebhook(
    rawBody: string,
    signature: string,
    secret: string
  ): Promise<{ success: boolean; bookingId: string | null; idempotent: boolean }> {
    // ------------------------------------------------------------------
    // Step 1: HMAC-SHA256 signature verification.
    // Using timingSafeEqual to prevent timing-oracle attacks.
    // ------------------------------------------------------------------
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody, "utf8")
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "utf8");
    const receivedBuffer = Buffer.from(signature, "utf8");

    // Buffers must be same length before timingSafeEqual or it will throw.
    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      // Attempt to extract orderId for logging — do not throw sensitive data.
      let orderId: string | undefined;
      try {
        const parsed = JSON.parse(rawBody);
        orderId = parsed?.gatewayOrderId ?? parsed?.order_id;
      } catch {
        // Payload may not be valid JSON — proceed without orderId.
      }

      throw new WebhookSignatureVerificationError(
        "Webhook signature verification failed. Request rejected.",
        orderId
      );
    }

    // ------------------------------------------------------------------
    // Step 2: Parse the verified payload.
    // ------------------------------------------------------------------
    let payload: NormalisedPaymentWebhook;
    try {
      payload = JSON.parse(rawBody) as NormalisedPaymentWebhook;
    } catch {
      throw new WebhookSignatureVerificationError(
        "Webhook payload is not valid JSON after signature verification passed."
      );
    }

    const { gatewayOrderId, gatewayPaymentId, event: webhookEvent } = payload;

    // ------------------------------------------------------------------
    // Step 3: Idempotency check — find the existing Payment row.
    // ------------------------------------------------------------------
    const existingPayment = await this.prisma.payment.findUnique({
      where: { gatewayOrderId },
      include: { booking: { select: { id: true, status: true } } },
    });

    if (!existingPayment) {
      // Unexpected: we received a webhook for an order we never created.
      // Log but do not error — return false so caller can alert.
      return { success: false, bookingId: null, idempotent: false };
    }

    // If we've already processed this exact gateway event, return immediately.
    const alreadyTerminal =
      existingPayment.status === "SUCCESS" ||
      existingPayment.status === "FAILED" ||
      existingPayment.status === "REFUNDED";

    if (alreadyTerminal) {
      return {
        success: existingPayment.status === "SUCCESS",
        bookingId: existingPayment.bookingId ?? null,
        idempotent: true, // Signal to caller: already processed, no action taken.
      };
    }

    // ------------------------------------------------------------------
    // Step 4: Persist payment status update + trigger booking transition.
    // ------------------------------------------------------------------
    if (webhookEvent === "PAYMENT_SUCCESS") {
      await this.prisma.$transaction(
        async (tx) => {
          // Update payment record.
          await tx.payment.update({
            where: { id: existingPayment.id },
            data: {
              status: "SUCCESS",
              gatewayPaymentId,
              gatewaySignature: signature,
              webhookPayload: JSON.parse(rawBody) as Prisma.InputJsonValue,
              paidAt: new Date(payload.gatewayTimestamp),
            },
          });

          // Write payment audit log.
          await tx.auditLog.create({
            data: {
              actorId: null, // System actor — gateway webhook
              action: AuditAction.PAYMENT_CONFIRMED,
              entity: "payments",
              entityId: existingPayment.id,
              previousState: { status: "PENDING" },
              newState: { status: "SUCCESS", gatewayPaymentId },
              metadata: { gatewayOrderId, webhookEvent },
            },
          });
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
      );

      // Trigger booking state machine transition (has its own transaction).
      if (
        existingPayment.bookingId &&
        existingPayment.booking?.status === BookingStatus.PAYMENT_PENDING
      ) {
        await this.transition(
          existingPayment.bookingId,
          BookingStatus.PAYMENT_RECEIVED,
          "SYSTEM:payment_webhook",
          { gatewayOrderId, gatewayPaymentId, webhookEvent }
        );
      }

      return {
        success: true,
        bookingId: existingPayment.bookingId ?? null,
        idempotent: false,
      };
    }

    if (webhookEvent === "PAYMENT_FAILED") {
      await this.prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { id: existingPayment.id },
          data: {
            status: "FAILED",
            gatewayPaymentId,
            gatewaySignature: signature,
            webhookPayload: JSON.parse(rawBody) as Prisma.InputJsonValue,
            failedAt: new Date(payload.gatewayTimestamp),
          },
        });

        await tx.auditLog.create({
          data: {
            actorId: null,
            action: AuditAction.PAYMENT_FAILED,
            entity: "payments",
            entityId: existingPayment.id,
            previousState: { status: "PENDING" },
            newState: { status: "FAILED", gatewayPaymentId },
            metadata: { gatewayOrderId, webhookEvent },
          },
        });
      });

      return {
        success: false,
        bookingId: existingPayment.bookingId ?? null,
        idempotent: false,
      };
    }

    // Unrecognised event type — return false without throwing.
    return { success: false, bookingId: existingPayment.bookingId ?? null, idempotent: false };
  }

  // =========================================================================
  // PRIVATE HELPERS
  // =========================================================================

  /**
   * Validate that moving from currentStatus to targetStatus is permitted
   * by the FSM transition matrix. Throws synchronously on violation.
   */
  private assertTransitionAllowed(
    bookingId: string,
    currentStatus: BookingStatus,
    targetStatus: BookingStatus
  ): void {
    const allowed = TRANSITIONS[currentStatus];

    if (!allowed.includes(targetStatus)) {
      throw new InvalidStateTransitionError(bookingId, currentStatus, targetStatus);
    }
  }

  /**
   * Atomically seed PENDING RewardLedger entries when a booking is confirmed.
   *
   * For each non-zero reward budget (direct, team, binary) on the booking,
   * we create a corresponding RewardLedger row tagged PENDING. These rows
   * represent the "promise" that will be fulfilled when the trip completes.
   *
   * NOTE: This method creates audit-trail ledger seeds only. Actual Reward
   * entity creation (with rate calculations) is handled by the RewardEngine
   * service in a separate phase. The seeds here ensure there is always an
   * immutable record that BOOKING_CONFIRMED fired even before the engine runs.
   */
  private async seedPendingRewardLedgerEntries(
    tx: Prisma.TransactionClient,
    booking: Booking,
    actorId: string
  ): Promise<void> {
    if (!booking.memberId) return;

    // We need a ruleVersionId - fetch the currently active rule version.
    const activeRule = await tx.ruleVersion.findFirst({
      where: { isActive: true },
      select: { id: true },
    });

    if (!activeRule) {
      throw new Error(
        `CRITICAL: No active RuleVersion found in the database. ` +
          `Cannot seed pending rewards for booking "${booking.id}". ` +
          `Activate a RuleVersion before confirming bookings.`
      );
    }

    const seeds: {
      rewardType: RewardType;
      amount: Prisma.Decimal;
      transactionType: TransactionType;
    }[] = [];

    if (booking.directRewardBudget.greaterThan(0)) {
      seeds.push({
        rewardType: RewardType.DIRECT,
        amount: booking.directRewardBudget,
        transactionType: TransactionType.CREDIT_DIRECT_REWARD,
      });
    }

    if (booking.binaryVolumeBudget.greaterThan(0)) {
      seeds.push({
        rewardType: RewardType.BINARY,
        amount: booking.binaryVolumeBudget,
        transactionType: TransactionType.CREDIT_BINARY_REWARD,
      });
    }

    if (booking.teamRewardBudget.greaterThan(0)) {
      const { TeamBonusEngine } = await import("../financial/TeamBonusEngine");
      const teamBonusEngine = new TeamBonusEngine();
      await teamBonusEngine.distributeTeamBonus(tx, booking.id, booking.memberId, booking.teamRewardBudget, activeRule.id);
    }

    if (seeds.length === 0) return;

    const wallet = await tx.wallet.findUnique({
      where: { memberId: booking.memberId },
      select: { id: true },
    });

    if (!wallet) {
      throw new Error(
        `Wallet not found for memberId "${booking.memberId}" ` +
          `during BOOKING_CONFIRMED reward seeding on booking "${booking.id}". ` +
          `Member must have an active wallet.`
      );
    }

    for (const seed of seeds) {
      const idempotencyKey =
        `reward-seed:${booking.id}:${seed.rewardType}:${booking.memberId}`;

      // Upsert pattern — if this BOOKING_CONFIRMED event fires twice (e.g., a
      // crash after DB commit but before event emission), the unique constraint
      // on idempotencyKey prevents duplicate reward rows.
      const existingReward = await tx.reward.findUnique({
        where: { idempotencyKey },
        select: { id: true },
      });

      let rewardId: string;

      if (existingReward) {
        rewardId = existingReward.id;
      } else {
        const reward = await tx.reward.create({
          data: {
            memberId: booking.memberId,
            sourceBookingId: booking.id,
            ruleVersionId: activeRule.id,
            rewardType: seed.rewardType,
            baseAmount: seed.amount,
            rate: new Prisma.Decimal(0), // Will be populated by RewardEngine
            calculatedAmount: new Prisma.Decimal(0),
            finalAmount: new Prisma.Decimal(0),
            status: "PENDING",
            idempotencyKey,
          },
        });
        rewardId = reward.id;
      }

      // Create the corresponding RewardLedger audit entry.
      await tx.rewardLedger.create({
        data: {
          rewardId,
          memberId: booking.memberId,
          sourceBookingId: booking.id,
          transactionType: seed.transactionType,
          status: TransactionStatus.PENDING,
          amount: seed.amount,
          notes: `PENDING seed created on BOOKING_CONFIRMED for ${seed.rewardType} reward`,
          createdBy: actorId === "SYSTEM:payment_webhook" ? null : actorId,
        },
      });
    }
  }

  /**
   * Release all PENDING RewardLedger entries for a booking to AVAILABLE
   * when the booking reaches COMPLETED.
   *
   * ARCHITECTURE NOTE: Reward.status is updated here as AVAILABLE. The
   * RewardEngine service (separate module) is responsible for the detailed
   * rate calculation, but the state machine acts as the gatekeeper that
   * grants the AVAILABLE permission.
   */
  private async releaseRewardLedgerEntries(
    tx: Prisma.TransactionClient,
    bookingId: string,
    now: Date
  ): Promise<void> {
    // Update all PENDING rewards for this booking to AVAILABLE.
    await tx.reward.updateMany({
      where: {
        sourceBookingId: bookingId,
        status: "PENDING",
      },
      data: {
        status: "AVAILABLE",
        availableAt: now,
      },
    });

    // Append a new AVAILABLE RewardLedger row for each affected reward.
    // We do NOT mutate the existing PENDING rows — we append new ones.
    const pendingLedgerEntries = await tx.rewardLedger.findMany({
      where: {
        sourceBookingId: bookingId,
        status: TransactionStatus.PENDING,
      },
    });

    for (const entry of pendingLedgerEntries) {
      await tx.rewardLedger.create({
        data: {
          rewardId: entry.rewardId,
          memberId: entry.memberId,
          sourceBookingId: bookingId,
          transactionType: entry.transactionType,
          status: TransactionStatus.AVAILABLE,
          amount: entry.amount,
          notes: `Released to AVAILABLE on BOOKING_COMPLETED`,
        },
      });
    }
  }

  /**
   * Reverse all PENDING reward ledger entries for a booking when it is
   * CANCELLED or REFUNDED.
   *
   * Reversal = new DEBIT_REVERSAL rows. The original PENDING rows are never
   * mutated or deleted, ensuring a complete audit trail.
   */
  private async reverseRewardLedgerEntries(
    tx: Prisma.TransactionClient,
    bookingId: string,
    actorId: string,
    reason: string
  ): Promise<void> {
    // Mark all non-terminal rewards as REVERSED.
    await tx.reward.updateMany({
      where: {
        sourceBookingId: bookingId,
        status: { in: ["PENDING", "APPROVED", "AVAILABLE"] },
      },
      data: {
        status: "REVERSED",
        reversedAt: new Date(),
        reversalReason: reason,
      },
    });

    // Append REVERSED RewardLedger rows for each affected entry.
    const activeEntries = await tx.rewardLedger.findMany({
      where: {
        sourceBookingId: bookingId,
        status: {
          in: [
            TransactionStatus.PENDING,
            TransactionStatus.APPROVED,
            TransactionStatus.AVAILABLE,
          ],
        },
      },
    });

    for (const entry of activeEntries) {
      await tx.rewardLedger.create({
        data: {
          rewardId: entry.rewardId,
          memberId: entry.memberId,
          sourceBookingId: bookingId,
          transactionType: TransactionType.DEBIT_REVERSAL,
          status: TransactionStatus.REVERSED,
          amount: entry.amount,
          notes: `REVERSED: ${reason}`,
          createdBy: actorId === "SYSTEM:payment_webhook" ? null : actorId,
        },
      });
    }

    // Also write a DEBIT_REVERSAL to the Wallet if any AVAILABLE credit
    // had already been posted to the wallet ledger.
    const availableWalletEntries = await tx.walletTransaction.findMany({
      where: {
        rewardId: {
          in: activeEntries.map((e) => e.rewardId),
        },
        transactionType: { in: [
          TransactionType.CREDIT_DIRECT_REWARD,
          TransactionType.CREDIT_TEAM_REWARD,
          TransactionType.CREDIT_BINARY_REWARD,
        ]},
        status: TransactionStatus.AVAILABLE,
      },
    });

    for (const walletEntry of availableWalletEntries) {
      await tx.walletTransaction.create({
        data: {
          walletId: walletEntry.walletId,
          rewardId: walletEntry.rewardId,
          transactionType: TransactionType.DEBIT_REVERSAL,
          status: TransactionStatus.REVERSED,
          amount: walletEntry.amount,
          balanceAfter: new Prisma.Decimal(0), // Will be recomputed by wallet service
          notes: `Wallet DEBIT_REVERSAL: ${reason}`,
          idempotencyKey: `reversal:wallet:${walletEntry.id}:${bookingId}`,
        },
      });
    }
  }

  /**
   * Emit typed domain events after a transition commits.
   * All events fire BOOKING_STATE_CHANGED. Additionally, specific events
   * fire for BOOKING_CONFIRMED, BOOKING_CANCELLED, and BOOKING_COMPLETED.
   */
  private emitStateChangedEvent(
    booking: Booking,
    newStatus: BookingStatus,
    actorId: string,
    metadata?: Record<string, unknown>
  ): void {
    const baseEvent: BookingStateChangedEvent = {
      bookingId: booking.id,
      bookingRef: booking.bookingRef,
      previousStatus: booking.status as BookingStatus, // Pre-update snapshot not available post-commit; callers use AuditLog
      newStatus,
      actorId,
      occurredAt: new Date(),
      metadata,
    };

    this.events.emit("BOOKING_STATE_CHANGED", baseEvent);

    switch (newStatus) {
      case BookingStatus.BOOKING_CONFIRMED:
        this.events.emit("BOOKING_CONFIRMED", {
          ...baseEvent,
          customerId: booking.customerId,
          memberId: booking.memberId,
          sellingPrice: booking.sellingPrice,
          grossContribution: booking.grossContribution,
          directRewardBudget: booking.directRewardBudget,
          teamRewardBudget: booking.teamRewardBudget,
          binaryVolumeBudget: booking.binaryVolumeBudget,
        } as BookingConfirmedEvent);
        break;

      case BookingStatus.CANCELLED:
        this.events.emit("BOOKING_CANCELLED", {
          ...baseEvent,
          cancellationReason: booking.cancellationReason ?? undefined,
        } as BookingCancelledEvent);
        break;

      case BookingStatus.COMPLETED:
        this.events.emit("BOOKING_COMPLETED", {
          ...baseEvent,
          completedAt: booking.completedAt ?? new Date(),
        } as BookingCompletedEvent);
        break;
    }
  }
}
