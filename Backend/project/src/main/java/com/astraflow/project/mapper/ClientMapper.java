package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.ClientRequest;
import com.astraflow.project.dto.response.ClientResponse;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.Tenant;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper {

    public Client toEntity(ClientRequest request) {
        if (request == null) {
            return null;
        }

        Client client = new Client();
        client.setEmail(request.getEmail());
        client.setPassword(request.getPassword());
        client.setFullName(request.getFullName());
        client.setPhone(request.getPhone());
        client.setUsername(request.getUsername());

        if (request.getTenantId() != null) {
            Tenant tenant = new Tenant();
            tenant.setId(request.getTenantId());
            client.setTenant(tenant);
        }

        return client;
    }

    public ClientResponse toResponse(Client client) {
        if (client == null) {
            return null;
        }
       

        return ClientResponse.builder()
                .id(client.getId())
                .tenantId(client.getTenant() != null ? client.getTenant().getId() : null)
                .email(client.getEmail())
                .fullName(client.getFullName())
                .phone(client.getPhone())
                .username(client.getUsername())
                .status(client.getStatus())
                .emailVerified(client.isEmailVerified())
                .createdAt(client.getCreatedAt())
                .updatedAt(client.getUpdatedAt())
                .build();
    }

    public void updateEntityFromRequest(Client client, ClientRequest request) {
        if (client == null || request == null) {
            return;
        }

        client.setEmail(request.getEmail());
        client.setFullName(request.getFullName());
        client.setPhone(request.getPhone());
        client.setUsername(request.getUsername());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            client.setPassword(request.getPassword());
        }

        if (request.getTenantId() != null) {
            Tenant tenant = new Tenant();
            tenant.setId(request.getTenantId());
            client.setTenant(tenant);
        }
    }
}