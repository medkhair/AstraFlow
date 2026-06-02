package com.astraflow.project.service;

import com.astraflow.project.model.Admin;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AdminService {

    List<Admin> findAll();

    Optional<Admin> findById(UUID id);

    Optional<Admin> findByEmail(String email);

    List<Admin> findByTenantId(UUID tenantId);

    Admin save(Admin admin);

    Admin update(UUID id, Admin admin);

    void deleteById(UUID id);

	String verify(Admin user);

	void changePassword(UUID id, String string, String string2);
}
