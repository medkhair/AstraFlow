package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.SubscriptionRequest;
import com.astraflow.project.dto.response.SubscriptionResponse;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.Plan;
import com.astraflow.project.model.Subscription;

public class SubscriptionMapper {
/*
    private SubscriptionMapper() {
    }

    public static Subscription toSubscription(SubscriptionRequest request) {
        if (request == null) {
            return null;
        }
        Subscription subscription = new Subscription();
        subscription.setStatus(request.getStatus());
        subscription.setStartDate(request.getStartDate());
        subscription.setEndDate(request.getEndDate());
        subscription.setTrialEndDate(request.getTrialEndDate());

       
        if (request.getClientId() != null) {
            Client client = new Client();
            client.setId(request.getClientId());
            subscription.setClient(client);
        }
        if (request.getPlanId() != null) {
            Plan plan = new Plan();
            plan.setId(request.getPlanId());
            subscription.setPlan(plan);
        }
        return subscription;
    }

    public static SubscriptionResponse toSubscriptionResponse(Subscription subscription) {
        if (subscription == null) {
            return null;
        }
        return SubscriptionResponse.builder()
                .id(subscription.getId())
                .clientId(subscription.getClient() != null ? subscription.getClient().getId() : null)
                .planId(subscription.getPlan() != null ? subscription.getPlan().getId() : null)
                .status(subscription.getStatus())
                .startDate(subscription.getStartDate())
                .endDate(subscription.getEndDate())
                .trialEndDate(subscription.getTrialEndDate())
                .createdAt(subscription.getCreatedAt())
                .updatedAt(subscription.getUpdatedAt())
                .build();
    }
    */
}