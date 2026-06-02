package com.astraflow.project.repository;

import com.astraflow.project.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {

    List<Client> findByTenantId(UUID tenantId);

    Optional<Client> findByEmail(String email);

    boolean existsByEmailAndTenantId(String email, UUID tenantId);

	Optional<Client> findByUsername(String username);
}
