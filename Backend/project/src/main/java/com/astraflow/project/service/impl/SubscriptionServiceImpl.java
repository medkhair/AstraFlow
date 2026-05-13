package com.astraflow.project.service.impl;

import com.astraflow.project.model.Subscription;
import com.astraflow.project.model.enums.SubscriptionStatus;
import com.astraflow.project.repository.SubscriptionRepository;
import com.astraflow.project.service.SubscriptionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class SubscriptionServiceImpl implements SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Override
    public List<Subscription> findAll() {
        return subscriptionRepository.findAll();
    }

    @Override
    public Optional<Subscription> findById(UUID id) {
        return subscriptionRepository.findById(id);
    }

    @Override
    public List<Subscription> findByClientId(UUID clientId) {
        return subscriptionRepository.findByClientId(clientId);
    }

    @Override
    public Optional<Subscription> findActiveByClientId(UUID clientId) {
        return subscriptionRepository.findByClientIdAndStatus(clientId, SubscriptionStatus.ACTIVE);
    }

    @Override
    public List<Subscription> findByStatus(SubscriptionStatus status) {
        return subscriptionRepository.findByStatus(status);
    }

    @Override
    @Transactional
    public Subscription save(Subscription subscription) {
        return subscriptionRepository.save(subscription);
    }

    @Override
    @Transactional
    public Subscription update(UUID id, Subscription subscription) {
        subscriptionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subscription not found with id: " + id));
        subscription.setId(id);
        return subscriptionRepository.save(subscription);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        subscriptionRepository.deleteById(id);
    }
}
