package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.SubscriptionRequest;
import com.astraflow.project.dto.response.SubscriptionResponse;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.Plan;
import com.astraflow.project.model.Subscription;

public class SubscriptionMapper {
    
    public static SubscriptionResponse toResponse(Subscription subscription) {
        if (subscription == null) {
            return null;
        }

        return SubscriptionResponse.builder()
                .id(subscription.getId())
                .clientId(subscription.getClient().getId())
                .planId(subscription.getPlan().getId())
                .status(subscription.getStatus())
                .startDate(subscription.getStartDate())
                .endDate(subscription.getEndDate())
                .trialEndDate(subscription.getTrialEndDate())
                .createdAt(subscription.getCreatedAt())
                .updatedAt(subscription.getUpdatedAt())
                .build();
    }

    public static Subscription toEntity(SubscriptionRequest request, Client client, Plan plan) {
        if (request == null) {
            return null;
        }

        Subscription subscription = new Subscription();
        subscription.setClient(client);
        subscription.setPlan(plan);
        subscription.setStatus(request.getStatus());
        subscription.setStartDate(request.getStartDate());
        subscription.setEndDate(request.getEndDate());
        subscription.setTrialEndDate(request.getTrialEndDate());
        return subscription;
    }
}