package com.astraflow.project.service.impl;

import com.astraflow.project.model.Subscription;
import com.astraflow.project.model.enums.SubscriptionStatus;
import com.astraflow.project.repository.SubscriptionRepository;
import com.astraflow.project.service.SubscriptionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

	@Override
	public boolean isSubscriptionActive(UUID clientId) {
        if (clientId == null) {
            throw new IllegalArgumentException("Client ID cannot be null");
        }
        if(subscriptionRepository.existsByClientIdAndStatus(clientId, SubscriptionStatus.ACTIVE)){

            return true;
        }
        else {

            throw new EntityNotFoundException("No active subscription found for client ID: " + clientId);
        }

	}

	@Override
	public boolean isSubscriptionExpiringSoon(UUID clientId, int daysThreshold) {
		return subscriptionRepository.findByClientIdAndStatus(clientId, SubscriptionStatus.ACTIVE)
				.map(sub -> !sub.getEndDate().isAfter(LocalDate.now().plusDays(daysThreshold)))
				.orElse(false);
	}

	@Override
	public boolean isSubscribed(UUID clientId) {
		return subscriptionRepository.existsByClientIdAndStatus(clientId, SubscriptionStatus.ACTIVE);
	}

	@Override
	public boolean hasSubscriptionExpired(UUID clientId) {
		return subscriptionRepository.findByClientIdAndStatus(clientId, SubscriptionStatus.EXPIRED)
				.isPresent()
				|| subscriptionRepository.findByClientIdAndStatus(clientId, SubscriptionStatus.ACTIVE)
				.map(sub -> sub.getEndDate().isBefore(LocalDate.now()))
				.orElse(false);
	}

	@Override
	public boolean isSubscriptionPaid(UUID clientId) {
		return subscriptionRepository.findByClientIdAndStatus(clientId, SubscriptionStatus.ACTIVE).isPresent();
	}

}
