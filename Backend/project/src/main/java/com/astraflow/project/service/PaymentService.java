package com.astraflow.project.service;

import com.astraflow.project.model.Payment;
import com.astraflow.project.model.enums.PaymentStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PaymentService {

    List<Payment> findAll();

    Optional<Payment> findById(UUID id);

    List<Payment> findBySubscriptionId(UUID subscriptionId);

    Optional<Payment> findByTransactionId(String transactionId);

    List<Payment> findByStatus(PaymentStatus status);

    Payment save(Payment payment);

    Payment update(UUID id, Payment payment);

    void deleteById(UUID id);
}
