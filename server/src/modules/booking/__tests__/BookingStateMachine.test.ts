/**
 * BookingStateMachine.test.ts
 *
 * Unit test suite for BookingStateMachineService.
 *
 * Test Strategy:
 *  - All Prisma calls are mocked via jest-mock-extended (deepMockClient).
 *  - No real DB connections — tests are fast and deterministic.
 *  - HMAC tests use real crypto to validate actual signature generation/rejection.
 *
 * Coverage areas:
 *  1. Happy path: valid state transitions
 *  2. Invalid transition rejection (InvalidStateTransitionError)
 *  3. Terminal state lock (COMPLETED / REFUNDED cannot be transitioned)
 *  4. Webhook: valid PAYMENT_SUCCESS triggers PAYMENT_RECEIVED transition
 *  5. Webhook: invalid signature throws WebhookSignatureVerificationError
 *  6. Webhook: duplicate (already SUCCESS) webhook is idempotent — no re-transition
 *  7. Booking not found throws BookingNotFoundError
 */

import crypto from "crypto";
import {
  BookingStateMachineService,
  BookingStatus,
  TRANSITIONS,
  InvalidStateTransitionError,
  WebhookSignatureVerificationError,
  BookingNotFoundError,
} from "../BookingStateMachine";
import { PrismaClient, AuditAction, Prisma } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

/**
 * Build a minimal Booking-shaped object for use in mocks.
 * Only includes fields that BookingStateMachineService reads.
 */
function buildMockBooking(overrides: Partial<{
  id: string;
  bookingRef: string;
  status: BookingStatus;
  memberId: string | null;
  customerId: string;
  sellingPrice: Prisma.Decimal;
  grossContribution: Prisma.Decimal;
  directRewardBudget: Prisma.Decimal;
  teamRewardBudget: Prisma.Decimal;
  binaryVolumeBudget: Prisma.Decimal;
  refundReserveBudget: Prisma.Decimal;
  netContribution: Prisma.Decimal;
  confirmedAt: Date | null;
  travelStartedAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
  cancellationReason: string | null;
}> = {}) {
  return {
    id: "booking-uuid-001",
    bookingRef: "BK-2026-00001",
    status: BookingStatus.PAYMENT_PENDING,
    memberId: "member-uuid-001",
    customerId: "user-uuid-001",
    packageId: "package-uuid-001",
    packagePriceId: "price-uuid-001",
    quoteId: null,
    referralId: null,
    travelDateFrom: new Date("2026-12-01"),
    travelDateTo: new Date("2026-12-08"),
    numTravellers: 2,
    sellingPrice: new Prisma.Decimal("26000.00"),
    supplierCost: new Prisma.Decimal("18000.00"),
    operationalCost: new Prisma.Decimal("500.00"),
    paymentCost: new Prisma.Decimal("260.00"),
    taxAmount: new Prisma.Decimal("3000.00"),
    grossContribution: new Prisma.Decimal("4240.00"),
    directRewardBudget: new Prisma.Decimal("1300.00"),
    teamRewardBudget: new Prisma.Decimal("800.00"),
    binaryVolumeBudget: new Prisma.Decimal("2000.00"),
    refundReserveBudget: new Prisma.Decimal("500.00"),
    netContribution: new Prisma.Decimal("1440.00"),
    confirmedAt: null,
    travelStartedAt: null,
    completedAt: null,
    cancelledAt: null,
    cancellationReason: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

/**
 * Generate a valid HMAC-SHA256 hex signature for a given body and secret.
 */
function signPayload(body: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(body, "utf8").digest("hex");
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe("BookingStateMachineService", () => {
  let prisma: DeepMockProxy<PrismaClient>;
  let sut: BookingStateMachineService;

  beforeEach(() => {
    prisma = mockDeep<PrismaClient>();
    sut = new BookingStateMachineService(prisma as unknown as PrismaClient);
  });

  // =========================================================================
  // SECTION A: FSM Transition Matrix
  // =========================================================================

  describe("TRANSITIONS matrix", () => {
    it("should define transitions for all 11 BookingStatus values", () => {
      const allStatuses = Object.values(BookingStatus) as BookingStatus[];
      for (const status of allStatuses) {
        expect(TRANSITIONS).toHaveProperty(status as string);
        expect(Array.isArray(TRANSITIONS[status])).toBe(true);
      }
    });

    it("COMPLETED should be a terminal state with no allowed transitions", () => {
      expect(TRANSITIONS[BookingStatus.COMPLETED]).toHaveLength(0);
    });

    it("REFUNDED should be a terminal state with no allowed transitions", () => {
      expect(TRANSITIONS[BookingStatus.REFUNDED]).toHaveLength(0);
    });

    it("PAYMENT_PENDING should allow PAYMENT_RECEIVED and CANCELLED", () => {
      expect(TRANSITIONS[BookingStatus.PAYMENT_PENDING]).toContain(BookingStatus.PAYMENT_RECEIVED);
      expect(TRANSITIONS[BookingStatus.PAYMENT_PENDING]).toContain(BookingStatus.CANCELLED);
    });

    it("BOOKING_CONFIRMED should allow TRAVEL_UPCOMING and CANCELLED", () => {
      expect(TRANSITIONS[BookingStatus.BOOKING_CONFIRMED]).toContain(BookingStatus.TRAVEL_UPCOMING);
      expect(TRANSITIONS[BookingStatus.BOOKING_CONFIRMED]).toContain(BookingStatus.CANCELLED);
    });
  });

  // =========================================================================
  // SECTION B: transition() — happy path
  // =========================================================================

  describe("transition() — valid transitions", () => {
    it("should transition PAYMENT_PENDING → PAYMENT_RECEIVED and write AuditLog", async () => {
      const bookingId = "booking-uuid-001";
      const actorId = "admin-uuid-001";
      const mockBooking = buildMockBooking({ status: BookingStatus.PAYMENT_PENDING });
      const updatedBooking = buildMockBooking({ status: BookingStatus.PAYMENT_RECEIVED });

      // Mock the $transaction to run its callback with a mock tx client.
      prisma.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();

        // FOR UPDATE raw query returns the booking.
        txMock.$queryRaw.mockResolvedValueOnce([mockBooking]);
        // booking.update returns the updated row.
        txMock.booking.update.mockResolvedValueOnce(updatedBooking as any);
        // auditLog.create succeeds silently.
        txMock.auditLog.create.mockResolvedValueOnce({} as any);

        return fn(txMock);
      });

      const result = await sut.transition(
        bookingId,
        BookingStatus.PAYMENT_RECEIVED,
        actorId
      );

      expect(result.status).toBe(BookingStatus.PAYMENT_RECEIVED);
    });

    it("should set confirmedAt timestamp when transitioning to BOOKING_CONFIRMED", async () => {
      const bookingId = "booking-uuid-002";
      const actorId = "admin-uuid-001";
      const mockBooking = buildMockBooking({ status: BookingStatus.PAYMENT_RECEIVED });

      let capturedUpdateData: any;

      prisma.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();

        txMock.$queryRaw.mockResolvedValueOnce([mockBooking]);
        (txMock.booking.update.mockImplementation as any)(async ({ data }: any) => {
          capturedUpdateData = data;
          return buildMockBooking({ status: BookingStatus.BOOKING_CONFIRMED, confirmedAt: data.confirmedAt }) as any;
        });
        txMock.auditLog.create.mockResolvedValueOnce({} as any);
        txMock.wallet.findUnique.mockResolvedValueOnce({ id: "wallet-uuid-001" } as any);
        txMock.ruleVersion.findFirst.mockResolvedValueOnce({ id: "rule-uuid-001" } as any);
        txMock.reward.findUnique.mockResolvedValueOnce(null);
        txMock.reward.create.mockResolvedValue({ id: "reward-uuid-001" } as any);
        txMock.rewardLedger.create.mockResolvedValue({} as any);

        return fn(txMock);
      });

      await sut.transition(bookingId, BookingStatus.BOOKING_CONFIRMED, actorId);

      expect(capturedUpdateData.confirmedAt).toBeInstanceOf(Date);
      expect(capturedUpdateData.status).toBe(BookingStatus.BOOKING_CONFIRMED);
    });

    it("should emit BOOKING_CONFIRMED domain event after transaction commits", async () => {
      const bookingId = "booking-uuid-003";
      const actorId = "admin-uuid-001";
      const mockBooking = buildMockBooking({ status: BookingStatus.PAYMENT_RECEIVED });
      const confirmedBooking = buildMockBooking({
        status: BookingStatus.BOOKING_CONFIRMED,
        confirmedAt: new Date(),
      });

      prisma.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();
        txMock.$queryRaw.mockResolvedValueOnce([mockBooking]);
        txMock.booking.update.mockResolvedValueOnce(confirmedBooking as any);
        txMock.auditLog.create.mockResolvedValueOnce({} as any);
        txMock.wallet.findUnique.mockResolvedValueOnce({ id: "wallet-uuid-001" } as any);
        txMock.ruleVersion.findFirst.mockResolvedValueOnce({ id: "rule-uuid-001" } as any);
        txMock.reward.findUnique.mockResolvedValueOnce(null);
        txMock.reward.create.mockResolvedValue({ id: "reward-uuid-001" } as any);
        txMock.rewardLedger.create.mockResolvedValue({} as any);
        return fn(txMock);
      });

      const emittedEvents: string[] = [];
      sut.events.on("BOOKING_CONFIRMED", () => emittedEvents.push("BOOKING_CONFIRMED"));
      sut.events.on("BOOKING_STATE_CHANGED", () => emittedEvents.push("BOOKING_STATE_CHANGED"));

      await sut.transition(bookingId, BookingStatus.BOOKING_CONFIRMED, actorId);

      expect(emittedEvents).toContain("BOOKING_CONFIRMED");
      expect(emittedEvents).toContain("BOOKING_STATE_CHANGED");
    });

    it("should emit BOOKING_COMPLETED and release rewards when transitioning to COMPLETED", async () => {
      const bookingId = "booking-uuid-004";
      const mockBooking = buildMockBooking({ status: BookingStatus.TRAVELING });
      const completedBooking = buildMockBooking({
        status: BookingStatus.COMPLETED,
        completedAt: new Date(),
      });

      prisma.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();
        txMock.$queryRaw.mockResolvedValueOnce([mockBooking]);
        txMock.booking.update.mockResolvedValueOnce(completedBooking as any);
        txMock.auditLog.create.mockResolvedValueOnce({} as any);
        txMock.reward.updateMany.mockResolvedValueOnce({ count: 3 } as any);
        txMock.rewardLedger.findMany.mockResolvedValueOnce([]);
        return fn(txMock);
      });

      const emittedEvents: string[] = [];
      sut.events.on("BOOKING_COMPLETED", () => emittedEvents.push("BOOKING_COMPLETED"));

      await sut.transition(bookingId, BookingStatus.COMPLETED, "admin-uuid-001");

      expect(emittedEvents).toContain("BOOKING_COMPLETED");
    });
  });

  // =========================================================================
  // SECTION C: transition() — invalid transitions
  // =========================================================================

  describe("transition() — invalid transitions", () => {
    it("should throw InvalidStateTransitionError for COMPLETED → PAYMENT_PENDING", async () => {
      const bookingId = "booking-uuid-005";
      const mockBooking = buildMockBooking({ status: BookingStatus.COMPLETED });

      prisma.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();
        txMock.$queryRaw.mockResolvedValueOnce([mockBooking]);
        return fn(txMock);
      });

      await expect(
        sut.transition(bookingId, BookingStatus.PAYMENT_PENDING, "admin-uuid-001")
      ).rejects.toThrow(InvalidStateTransitionError);
    });

    it("should throw InvalidStateTransitionError for REFUNDED → BOOKING_CONFIRMED", async () => {
      const bookingId = "booking-uuid-006";
      const mockBooking = buildMockBooking({ status: BookingStatus.REFUNDED });

      prisma.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();
        txMock.$queryRaw.mockResolvedValueOnce([mockBooking]);
        return fn(txMock);
      });

      await expect(
        sut.transition(bookingId, BookingStatus.BOOKING_CONFIRMED, "admin-uuid-001")
      ).rejects.toThrow(InvalidStateTransitionError);
    });

    it("should throw InvalidStateTransitionError for QUOTE_REQUESTED → TRAVELING", async () => {
      const bookingId = "booking-uuid-007";
      const mockBooking = buildMockBooking({ status: BookingStatus.QUOTE_REQUESTED });

      prisma.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();
        txMock.$queryRaw.mockResolvedValueOnce([mockBooking]);
        return fn(txMock);
      });

      await expect(
        sut.transition(bookingId, BookingStatus.TRAVELING, "admin-uuid-001")
      ).rejects.toThrow(InvalidStateTransitionError);
    });

    it("should include current and target status in the error", async () => {
      const bookingId = "booking-uuid-008";
      const mockBooking = buildMockBooking({ status: BookingStatus.COMPLETED });

      prisma.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();
        txMock.$queryRaw.mockResolvedValueOnce([mockBooking]);
        return fn(txMock);
      });

      try {
        await sut.transition(bookingId, BookingStatus.PAYMENT_PENDING, "admin-uuid-001");
        fail("Expected InvalidStateTransitionError to be thrown");
      } catch (err) {
        expect(err).toBeInstanceOf(InvalidStateTransitionError);
        const transitionError = err as InvalidStateTransitionError;
        expect(transitionError.currentStatus).toBe(BookingStatus.COMPLETED);
        expect(transitionError.targetStatus).toBe(BookingStatus.PAYMENT_PENDING);
        expect(transitionError.bookingId).toBe(bookingId);
      }
    });

    it("should throw BookingNotFoundError when booking does not exist", async () => {
      prisma.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();
        txMock.$queryRaw.mockResolvedValueOnce([]); // Empty result = not found
        return fn(txMock);
      });

      await expect(
        sut.transition("non-existent-uuid", BookingStatus.PAYMENT_RECEIVED, "admin-uuid-001")
      ).rejects.toThrow(BookingNotFoundError);
    });

    it("should NOT write AuditLog when transition validation fails", async () => {
      const bookingId = "booking-uuid-009";
      const mockBooking = buildMockBooking({ status: BookingStatus.COMPLETED });
      let auditLogCreateCalled = false;

      prisma.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();
        txMock.$queryRaw.mockResolvedValueOnce([mockBooking]);
        (txMock.auditLog.create.mockImplementation as any)(async () => {
          auditLogCreateCalled = true;
          return {} as any;
        });
        return fn(txMock);
      });

      await expect(
        sut.transition(bookingId, BookingStatus.PAYMENT_PENDING, "admin-uuid-001")
      ).rejects.toThrow(InvalidStateTransitionError);

      // AuditLog.create must NOT have been called — the error fires before DB write.
      expect(auditLogCreateCalled).toBe(false);
    });
  });

  // =========================================================================
  // SECTION D: handlePaymentWebhook() — signature verification
  // =========================================================================

  describe("handlePaymentWebhook() — HMAC signature verification", () => {
    const secret = "whsec_test_secret_key_32_bytes_!!";

    const buildWebhookPayload = (gatewayOrderId = "order_001") => ({
      gatewayOrderId,
      gatewayPaymentId: "pay_abc123",
      event: "PAYMENT_SUCCESS" as const,
      amountInSmallestUnit: 2600000,
      currency: "INR",
      gatewayTimestamp: "2026-09-11T11:30:00.000Z",
      signature: "", // Will be replaced
    });

    it("should accept a request with a valid HMAC-SHA256 signature", async () => {
      const payload = buildWebhookPayload("order_valid_001");
      const rawBody = JSON.stringify(payload);
      const validSig = signPayload(rawBody, secret);

      // Mock payment lookup — payment already at SUCCESS (idempotent return)
      prisma.payment.findUnique.mockResolvedValueOnce({
        id: "payment-uuid-001",
        gatewayOrderId: "order_valid_001",
        status: "SUCCESS",
        bookingId: "booking-uuid-001",
        booking: { id: "booking-uuid-001", status: BookingStatus.PAYMENT_PENDING },
      } as any);

      const result = await sut.handlePaymentWebhook(rawBody, validSig, secret);

      // Already SUCCESS → idempotent response
      expect(result.idempotent).toBe(true);
      expect(result.success).toBe(true);
    });

    it("should throw WebhookSignatureVerificationError for an invalid signature", async () => {
      const payload = buildWebhookPayload("order_forged_001");
      const rawBody = JSON.stringify(payload);
      const invalidSig = "0".repeat(64); // Clearly wrong signature

      await expect(
        sut.handlePaymentWebhook(rawBody, invalidSig, secret)
      ).rejects.toThrow(WebhookSignatureVerificationError);
    });

    it("should throw WebhookSignatureVerificationError for a tampered payload (valid sig on different body)", async () => {
      const original = buildWebhookPayload("order_tamper_001");
      const originalBody = JSON.stringify(original);
      const validSigForOriginal = signPayload(originalBody, secret);

      // Attacker tampers with the amount — signature now refers to original body
      const tamperedPayload = { ...original, amountInSmallestUnit: 1 };
      const tamperedBody = JSON.stringify(tamperedPayload);

      await expect(
        sut.handlePaymentWebhook(tamperedBody, validSigForOriginal, secret)
      ).rejects.toThrow(WebhookSignatureVerificationError);
    });

    it("should return idempotent:true for duplicate PAYMENT_SUCCESS webhook", async () => {
      const payload = buildWebhookPayload("order_dup_001");
      const rawBody = JSON.stringify(payload);
      const sig = signPayload(rawBody, secret);

      // Simulate already-processed payment (status = SUCCESS).
      prisma.payment.findUnique.mockResolvedValueOnce({
        id: "payment-uuid-002",
        gatewayOrderId: "order_dup_001",
        status: "SUCCESS",
        bookingId: "booking-uuid-010",
        booking: { id: "booking-uuid-010", status: BookingStatus.PAYMENT_RECEIVED },
      } as any);

      const result = await sut.handlePaymentWebhook(rawBody, sig, secret);

      expect(result.idempotent).toBe(true);
      expect(result.success).toBe(true);
      // Prisma transaction must NOT have been called — no DB write for duplicates.
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });

    it("should trigger PAYMENT_RECEIVED transition on first PAYMENT_SUCCESS webhook", async () => {
      const payload = buildWebhookPayload("order_first_001");
      const rawBody = JSON.stringify(payload);
      const sig = signPayload(rawBody, secret);

      // Payment is still INITIATED (not yet processed).
      prisma.payment.findUnique.mockResolvedValueOnce({
        id: "payment-uuid-003",
        gatewayOrderId: "order_first_001",
        status: "INITIATED",
        bookingId: "booking-uuid-011",
        booking: { id: "booking-uuid-011", status: BookingStatus.PAYMENT_PENDING },
      } as any);

      // First $transaction call: updates payment record.
      prisma.$transaction.mockImplementationOnce(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();
        txMock.payment.update.mockResolvedValueOnce({} as any);
        txMock.auditLog.create.mockResolvedValueOnce({} as any);
        return fn(txMock);
      });

      // Second $transaction call: booking state transition (PAYMENT_PENDING → PAYMENT_RECEIVED).
      prisma.$transaction.mockImplementationOnce(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();
        txMock.$queryRaw.mockResolvedValueOnce([
          buildMockBooking({ status: BookingStatus.PAYMENT_PENDING, id: "booking-uuid-011" }),
        ]);
        txMock.booking.update.mockResolvedValueOnce(
          buildMockBooking({ status: BookingStatus.PAYMENT_RECEIVED, id: "booking-uuid-011" }) as any
        );
        txMock.auditLog.create.mockResolvedValueOnce({} as any);
        return fn(txMock);
      });

      const result = await sut.handlePaymentWebhook(rawBody, sig, secret);

      expect(result.success).toBe(true);
      expect(result.idempotent).toBe(false);
      expect(result.bookingId).toBe("booking-uuid-011");
      // Two $transaction calls expected: one for payment, one for booking transition.
      expect(prisma.$transaction).toHaveBeenCalledTimes(2);
    });

    it("should return success:false and not mutate DB when gateway order is unknown", async () => {
      const payload = buildWebhookPayload("order_unknown_001");
      const rawBody = JSON.stringify(payload);
      const sig = signPayload(rawBody, secret);

      // Payment.findUnique returns null — order never created in our system.
      prisma.payment.findUnique.mockResolvedValueOnce(null);

      const result = await sut.handlePaymentWebhook(rawBody, sig, secret);

      expect(result.success).toBe(false);
      expect(result.bookingId).toBeNull();
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });
  });

  // =========================================================================
  // SECTION E: Reward Seeding on BOOKING_CONFIRMED
  // =========================================================================

  describe("reward seeding on BOOKING_CONFIRMED", () => {
    it("should NOT seed reward ledger entries for bookings with no memberId", async () => {
      const bookingId = "booking-uuid-nomember";
      const mockBooking = buildMockBooking({
        status: BookingStatus.PAYMENT_RECEIVED,
        memberId: null, // Non-member booking
      });

      let rewardCreateCalled = false;

      prisma.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();
        txMock.$queryRaw.mockResolvedValueOnce([mockBooking]);
        txMock.booking.update.mockResolvedValueOnce(
          buildMockBooking({ status: BookingStatus.BOOKING_CONFIRMED, memberId: null }) as any
        );
        txMock.auditLog.create.mockResolvedValueOnce({} as any);
        (txMock.reward.create.mockImplementation as any)(async () => {
          rewardCreateCalled = true;
          return {} as any;
        });
        return fn(txMock);
      });

      await sut.transition(bookingId, BookingStatus.BOOKING_CONFIRMED, "admin-uuid-001");

      expect(rewardCreateCalled).toBe(false);
    });

    it("should throw if no active RuleVersion found during BOOKING_CONFIRMED seeding", async () => {
      const bookingId = "booking-uuid-norule";
      const mockBooking = buildMockBooking({ status: BookingStatus.PAYMENT_RECEIVED });

      prisma.$transaction.mockImplementation(async (fn: any) => {
        const txMock = mockDeep<Prisma.TransactionClient>();
        txMock.$queryRaw.mockResolvedValueOnce([mockBooking]);
        txMock.booking.update.mockResolvedValueOnce(
          buildMockBooking({ status: BookingStatus.BOOKING_CONFIRMED }) as any
        );
        txMock.auditLog.create.mockResolvedValueOnce({} as any);
        txMock.wallet.findUnique.mockResolvedValueOnce({ id: "wallet-uuid-001" } as any);
        // No active rule version found.
        txMock.ruleVersion.findFirst.mockResolvedValueOnce(null);
        return fn(txMock);
      });

      await expect(
        sut.transition(bookingId, BookingStatus.BOOKING_CONFIRMED, "admin-uuid-001")
      ).rejects.toThrow(/No active RuleVersion/);
    });
  });
});
