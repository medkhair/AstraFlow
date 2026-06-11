package com.astraflow.project.repository;

import com.astraflow.project.payment.stripe.StripePaymentEventLedger;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Append-only (immutable) ledger repository.
 * By extending {@link Repository} instead of {@link org.springframework.data.jpa.repository.JpaRepository},
 * delete and bulk-update operations are structurally absent — they cannot be called.
 * Column-level immutability is enforced via {@code updatable = false} on every field.
 */
@org.springframework.stereotype.Repository
public interface StripePaymentEventLedgerRepository extends Repository<StripePaymentEventLedger, UUID> {

    /** Inserts a new ledger entry. Hibernate will never issue an UPDATE due to {@code updatable = false}. */
    StripePaymentEventLedger save(StripePaymentEventLedger entity);

    boolean existsByStripeEventId(String stripeEventId);

    Optional<StripePaymentEventLedger> findByStripeEventId(String stripeEventId);

    Optional<StripePaymentEventLedger> findById(UUID id);

    /** Returns the most recent entry — used to retrieve the tail hash for chain linking. */
    Optional<StripePaymentEventLedger> findTopByOrderByProcessedAtDesc();

    /** Returns all entries in insertion order — used for chain integrity verification. */
    List<StripePaymentEventLedger> findAllByOrderByProcessedAtAsc();

    long count();
}
