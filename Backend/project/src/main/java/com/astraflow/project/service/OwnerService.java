package com.astraflow.project.service;

import com.astraflow.project.model.Owner;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OwnerService {

    List<Owner> findAll();

    Optional<Owner> findById(UUID id);

    Optional<Owner> findByEmail(String email);

    Owner save(Owner owner);

    Owner update(UUID id, Owner owner);

    void deleteById(UUID id);
}
