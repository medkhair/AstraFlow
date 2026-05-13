package com.astraflow.project.service.impl;

import com.astraflow.project.model.Owner;
import com.astraflow.project.repository.OwnerRepository;
import com.astraflow.project.service.OwnerService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OwnerServiceImpl implements OwnerService {

    private final OwnerRepository ownerRepository;

    @Override
    public List<Owner> findAll() {
        return ownerRepository.findAll();
    }

    @Override
    public Optional<Owner> findById(UUID id) {
        return ownerRepository.findById(id);
    }

    @Override
    public Optional<Owner> findByEmail(String email) {
        return ownerRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public Owner save(Owner owner) {
        return ownerRepository.save(owner);
    }

    @Override
    @Transactional
    public Owner update(UUID id, Owner owner) {
        ownerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Owner not found with id: " + id));
        owner.setId(id);
        return ownerRepository.save(owner);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        ownerRepository.deleteById(id);
    }
}
