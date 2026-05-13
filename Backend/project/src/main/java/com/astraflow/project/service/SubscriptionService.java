package com.astraflow.project.service;

import com.astraflow.project.model.Subscription;
import com.astraflow.project.model.enums.SubscriptionStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SubscriptionService {

    List<Subscription> findAll();

    Optional<Subscription> findById(UUID id);

    List<Subscription> findByClientId(UUID clientId);

    Optional<Subscription> findActiveByClientId(UUID clientId);

    List<Subscription> findByStatus(SubscriptionStatus status);

    Subscription save(Subscription subscription);

    Subscription update(UUID id, Subscription subscription);

    void deleteById(UUID id);
}
