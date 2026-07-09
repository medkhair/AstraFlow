package com.astraflow.project.service;

import com.astraflow.project.dto.response.SubscriptionResponse;
import com.astraflow.project.model.Subscription;
import com.astraflow.project.model.enums.SubscriptionStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SubscriptionService {

    List<Subscription> findAll();

    Optional<Subscription> findById(UUID id);

    Subscription findByClientId(UUID clientId);

    Optional<Subscription> findActiveByClientId(UUID clientId);

    List<Subscription> findByStatus(SubscriptionStatus status);

    Subscription save(Subscription subscription);

    Subscription update(UUID id, Subscription subscription);

    void deleteById(UUID id);

    boolean isSubscriptionActive(UUID clientId);

    boolean isSubscriptionExpiringSoon(UUID clientId, int daysThreshold);

    boolean isSubscribed(UUID clientId);

    boolean hasSubscriptionExpired(UUID clientId);

    boolean isSubscriptionPaid(UUID clientId);
    
    SubscriptionResponse create(Subscription subscription);

    SubscriptionResponse updatee(UUID id, Subscription subscription);

    Optional<SubscriptionResponse> findResponseById(UUID id);

    List<SubscriptionResponse> findAllResponses();

    List<SubscriptionResponse> findByStatusResponses(SubscriptionStatus status);

    SubscriptionResponse findResponseByClientId(UUID clientId);
    
}
