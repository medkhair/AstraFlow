package com.astraflow.project.repository;

import com.astraflow.project.model.Subscription;
import com.astraflow.project.model.enums.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {

    Subscription findByClientId(UUID clientId);

    Optional<Subscription> findByClientIdAndStatus(UUID clientId, SubscriptionStatus status);

    List<Subscription> findByPlanId(UUID planId);

    List<Subscription> findByEndDateBefore(LocalDate date);

    List<Subscription> findByStatus(SubscriptionStatus status);

    boolean existsByClientIdAndStatus(UUID clientId, SubscriptionStatus status);

    List<Subscription> findByTenantId(UUID tenantId);
}
