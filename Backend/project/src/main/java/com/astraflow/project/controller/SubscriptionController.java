package com.astraflow.project.controller;

import com.astraflow.project.dto.response.SubscriptionResponse;
import com.astraflow.project.model.Subscription;
import com.astraflow.project.model.enums.SubscriptionStatus;
import com.astraflow.project.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/subscriptions")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'CLIENT')")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @GetMapping
    public ResponseEntity<List<Subscription>> findAll() {
        return ResponseEntity.ok(subscriptionService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subscription> findById(@PathVariable UUID id) {
        return subscriptionService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/client/{clientId}")
    @PreAuthorize("@authorizationService.canAccessClient(authentication, #clientId)")
    public ResponseEntity<SubscriptionResponse> findByClientId(@PathVariable UUID clientId) {
        return ResponseEntity.ok(subscriptionService.findResponseByClientId(clientId));
    }

    @GetMapping("/client/{clientId}/active")
    @PreAuthorize("@authorizationService.canAccessClient(authentication, #clientId)")
    public ResponseEntity<Subscription> findActiveByClientId(@PathVariable UUID clientId) {
        return subscriptionService.findActiveByClientId(clientId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Subscription>> findByStatus(@PathVariable SubscriptionStatus status) {
        return ResponseEntity.ok(subscriptionService.findByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Subscription> create(@RequestBody Subscription subscription) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subscriptionService.save(subscription));
    }

    @PutMapping("/{id}")
    @PreAuthorize("@authorizationService.canManageSubscription(authentication, #id)")
    public ResponseEntity<Subscription> update(@PathVariable UUID id, @RequestBody Subscription subscription) {
        return ResponseEntity.ok(subscriptionService.update(id, subscription));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@authorizationService.canManageSubscription(authentication, #id)")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        subscriptionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/client/{clientId}/subscribed")
    @PreAuthorize("@authorizationService.canAccessClient(authentication, #clientId)")
    public ResponseEntity<Boolean> isClientSubscribed(@PathVariable UUID clientId) {
        boolean isSubscribed = subscriptionService.isSubscribed(clientId);
        return ResponseEntity.ok(isSubscribed);
    }

    @GetMapping("/client/{clientId}/active-subscription")
    @PreAuthorize("@authorizationService.canAccessClient(authentication, #clientId)")
    public ResponseEntity<Boolean> getActiveSubscription(@PathVariable UUID clientId) {
        boolean isSubscriptionActive = subscriptionService.isSubscriptionActive(clientId);

        return ResponseEntity.ok(isSubscriptionActive);
    }

    @GetMapping("/tenant/{tenantId}")
    @PreAuthorize("@authorizationService.canAccessTenant(authentication, #tenantId)")
    public ResponseEntity<List<SubscriptionResponse>> findByTenantId(@PathVariable UUID tenantId) {
        return ResponseEntity.ok(subscriptionService.findByTenantIdResponses(tenantId));
    }
    
    

}
