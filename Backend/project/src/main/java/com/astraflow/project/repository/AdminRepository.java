package com.astraflow.project.repository;

import com.astraflow.project.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AdminRepository extends JpaRepository<Admin, UUID> {

    List<Admin> findByTenantId(UUID tenantId);

    Optional<Admin> findByEmail(String email);

    boolean existsByEmailAndTenantId(String email, UUID tenantId);
}
