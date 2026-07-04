package com.astraflow.project.dto.request;

import java.util.UUID;

public record CreatePaymentIntentRequest(UUID planId, UUID clientId, String currency) {}
