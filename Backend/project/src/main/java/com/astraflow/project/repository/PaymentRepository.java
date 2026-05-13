package com.astraflow.project.repository;

import com.astraflow.project.model.Payment;
import com.astraflow.project.model.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    List<Payment> findBySubscriptionId(UUID subscriptionId);

    Optional<Payment> findByTransactionId(String transactionId);

    List<Payment> findByStatus(PaymentStatus status);

    List<Payment> findBySubscriptionIdAndStatus(UUID subscriptionId, PaymentStatus status);
}
