package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.PaymentRequest;
import com.astraflow.project.dto.response.PaymentResponse;
import com.astraflow.project.model.Payment;
import com.astraflow.project.model.Subscription;

public class PaymentMapper {

    public static PaymentResponse toResponse(Payment payment) {
        if (payment == null) {
            return null;
        }

        Subscription subscription = payment.getSubscription();

        return PaymentResponse.builder()
                .id(payment.getId())
                .subscriptionId(subscription != null ? subscription.getId() : null)
                .amount(payment.getAmount())
                .currency(payment.getCurrency())
                .method(payment.getMethod())
                .status(payment.getStatus())
                .transactionId(payment.getTransactionId())
                .paidAt(payment.getPaidAt())
                .build();
    }

    public static PaymentResponse toPaymentResponse(Payment payment) {
        return toResponse(payment);
    }

    public static Payment toEntity(PaymentRequest request, Subscription subscription) {
        if (request == null) {
            return null;
        }

        Payment payment = new Payment();
        payment.setSubscription(subscription);
        payment.setAmount(request.getAmount());
        payment.setCurrency(request.getCurrency());
        payment.setMethod(request.getMethod());
        payment.setStatus(request.getStatus());
        payment.setTransactionId(request.getTransactionId());
        payment.setPaidAt(request.getPaidAt());
        return payment;
    }

    public static Payment toPayment(PaymentRequest request, Subscription subscription) {
        return toEntity(request, subscription);
    }
}