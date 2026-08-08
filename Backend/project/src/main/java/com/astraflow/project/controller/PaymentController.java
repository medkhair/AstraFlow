package com.astraflow.project.controller;

import com.astraflow.project.dto.response.PaymentResponse;
import com.astraflow.project.model.Payment;
import com.astraflow.project.model.enums.PaymentStatus;
import com.astraflow.project.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/payments")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'CLIENT')")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<Payment>> findAll() {
        return ResponseEntity.ok(paymentService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("@authorizationService.canAccessPayment(authentication, #id)")
    public ResponseEntity<Payment> findById(@PathVariable UUID id) {
        return paymentService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/subscription/{subscriptionId}")
    @PreAuthorize("@authorizationService.canAccessSubscription(authentication, #subscriptionId)")
    public ResponseEntity<List<Payment>> findBySubscriptionId(@PathVariable UUID subscriptionId) {
        return ResponseEntity.ok(paymentService.findBySubscriptionId(subscriptionId));
    }

    @GetMapping("/transaction/{transactionId}")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<Payment> findByTransactionId(@PathVariable String transactionId) {
        return paymentService.findByTransactionId(transactionId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<List<Payment>> findByStatus(@PathVariable PaymentStatus status) {
        return ResponseEntity.ok(paymentService.findByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Payment> create(@RequestBody Payment payment) {
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.save(payment));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<Payment> update(@PathVariable UUID id, @RequestBody Payment payment) {
        return ResponseEntity.ok(paymentService.update(id, payment));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        paymentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tenant/{tenantId}")
    @PreAuthorize("@authorizationService.canAccessTenant(authentication, #tenantId)")
    public ResponseEntity<List<PaymentResponse>> findByTenantId(@PathVariable UUID tenantId) {
        return ResponseEntity.ok(paymentService.findByTenantId(tenantId));
    }
}
