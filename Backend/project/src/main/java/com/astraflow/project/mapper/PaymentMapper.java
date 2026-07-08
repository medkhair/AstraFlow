package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.PaymentRequest;
import com.astraflow.project.dto.response.PaymentResponse;
import com.astraflow.project.model.Payment;
import com.astraflow.project.model.Subscription;

public class PaymentMapper {
/*
    private PaymentMapper() {
    }

    public static Payment toPayment(PaymentRequest request) {
        if (request == null) {
            return null;
        }
        Payment payment = new Payment();
        payment.setAmount(request.getAmount());
        payment.setCurrency(request.getCurrency());
        payment.setMethod(request.getMethod());
        payment.setStatus(request.getStatus());
        payment.setTransactionId(request.getTransactionId());
        payment.setPaidAt(request.getPaidAt());

        if (request.getSubscriptionId() != null) {
            Subscription subscription = new Subscription();
            subscription.setId(request.getSubscriptionId());
            payment.setSubscription(subscription);
        }
        return payment;
    }

    public static PaymentResponse toPaymentResponse(Payment payment) {
        if (payment == null) {
            return null;
        }
        return PaymentResponse.builder()
                .id(payment.getId())
                .subscriptionId(payment.getSubscription() != null ? payment.getSubscription().getId() : null)
                .amount(payment.getAmount())
                .currency(payment.getCurrency())
                .method(payment.getMethod())
                .status(payment.getStatus())
                .transactionId(payment.getTransactionId())
                .paidAt(payment.getPaidAt())
                .build();
    }
*/
}