package com.astraflow.project.controller;

import com.astraflow.project.model.Payment;
import com.astraflow.project.model.enums.PaymentStatus;
import com.astraflow.project.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<Payment>> findAll() {
        return ResponseEntity.ok(paymentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> findById(@PathVariable UUID id) {
        return paymentService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/subscription/{subscriptionId}")
    public ResponseEntity<List<Payment>> findBySubscriptionId(@PathVariable UUID subscriptionId) {
        return ResponseEntity.ok(paymentService.findBySubscriptionId(subscriptionId));
    }

    @GetMapping("/transaction/{transactionId}")
    public ResponseEntity<Payment> findByTransactionId(@PathVariable String transactionId) {
        return paymentService.findByTransactionId(transactionId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Payment>> findByStatus(@PathVariable PaymentStatus status) {
        return ResponseEntity.ok(paymentService.findByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Payment> create(@RequestBody Payment payment) {
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.save(payment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> update(@PathVariable UUID id, @RequestBody Payment payment) {
        return ResponseEntity.ok(paymentService.update(id, payment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        paymentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
