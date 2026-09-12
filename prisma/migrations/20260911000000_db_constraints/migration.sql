-- 1. CHECK constraints on financial tables (amount >= 0)
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_amount_check" CHECK (amount >= 0);
ALTER TABLE "reward_ledger" ADD CONSTRAINT "reward_ledger_amount_check" CHECK (amount >= 0);
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_base_amount_check" CHECK ("baseAmount" >= 0);
ALTER TABLE "binary_volume_events" ADD CONSTRAINT "binary_volume_events_eligible_amount_check" CHECK ("eligibleAmount" >= 0);

-- 2. Exclusionary/unique constraint preventing duplicate attribution for the same booking ID in RewardLedger
-- Ensures that a member cannot receive multiple PENDING transactions for the SAME reward type from the SAME booking.
CREATE UNIQUE INDEX "reward_ledger_duplicate_attribution_idx" 
ON "reward_ledger" ("memberId", "sourceBookingId", "transactionType")
WHERE status = 'PENDING';

-- 3. Append-only AuditLog table with trigger-level immutability (rejecting UPDATE or DELETE)
CREATE OR REPLACE FUNCTION prevent_audit_log_mutation()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'AuditLog is append-only. UPDATE and DELETE operations are strictly forbidden.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_audit_log_append_only
BEFORE UPDATE OR DELETE ON "AuditLog"
FOR EACH ROW EXECUTE FUNCTION prevent_audit_log_mutation();
