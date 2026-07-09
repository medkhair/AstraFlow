package com.astraflow.project.service;

import com.astraflow.project.dto.request.ClientRequest;
import com.astraflow.project.dto.response.ClientResponse;
import com.astraflow.project.model.Client;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.jspecify.annotations.Nullable;

public interface ClientService {

    List<Client> findAll();

    Optional<Client> findById(UUID id);

    Optional<Client> findByEmail(String email);

    List<Client> findByTenantId(UUID tenantId);

    Client save(Client client);

    Client update(UUID id, Client client);

    void deleteById(UUID id);

    String verify(Client user);

    @Nullable
    Object isEmailVerified(UUID clientId);

    ClientResponse create(ClientRequest request);

    ClientResponse update(UUID id, ClientRequest request);

    Optional<ClientResponse> findResponseById(UUID id);

    List<ClientResponse> findAllResponses();

    List<ClientResponse> findByTenantIdResponses(UUID tenantId);
}