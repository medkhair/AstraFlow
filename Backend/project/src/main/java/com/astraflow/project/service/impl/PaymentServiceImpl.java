package com.astraflow.project.service.impl;

import com.astraflow.project.dto.response.PaymentResponse;
import com.astraflow.project.model.Payment;
import com.astraflow.project.model.enums.PaymentStatus;
import com.astraflow.project.repository.PaymentRepository;
import com.astraflow.project.service.PaymentService;
import com.astraflow.project.mapper.PaymentMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public List<Payment> findAll() {
        return paymentRepository.findAll();
    }

    @Override
    public Optional<Payment> findById(UUID id) {
        return paymentRepository.findById(id);
    }

    @Override
    public List<Payment> findBySubscriptionId(UUID subscriptionId) {
        return paymentRepository.findBySubscriptionId(subscriptionId);
    }

    @Override
    public Optional<Payment> findByTransactionId(String transactionId) {
        return paymentRepository.findByTransactionId(transactionId);
    }

    @Override
    public List<Payment> findByStatus(PaymentStatus status) {
        return paymentRepository.findByStatus(status);
    }

    @Override
    @Transactional
    public Payment save(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    @Transactional
    public Payment update(UUID id, Payment payment) {
        paymentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found with id: " + id));
        payment.setId(id);
        return paymentRepository.save(payment);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        paymentRepository.deleteById(id);
    }

    @Override
    @Transactional
    public List<PaymentResponse> findByTenantId(UUID tenantId) {
        return paymentRepository.findByTenantId(tenantId).stream().map(PaymentMapper::toPaymentResponse).toList();
    }


}
