package com.astraflow.project.service;

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
}
