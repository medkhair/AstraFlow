package com.astraflow.project.dto;

import java.util.UUID;

public record CreatePaymentIntentRequest(UUID planId, UUID clientId, String currency) {}
