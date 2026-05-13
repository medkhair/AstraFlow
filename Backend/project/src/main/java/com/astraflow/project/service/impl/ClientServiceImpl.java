package com.astraflow.project.service.impl;

import com.astraflow.project.model.Client;
import com.astraflow.project.repository.ClientRepository;
import com.astraflow.project.service.ClientService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    @Override
    public Optional<Client> findById(UUID id) {
        return clientRepository.findById(id);
    }

    @Override
    public Optional<Client> findByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    @Override
    public List<Client> findByTenantId(UUID tenantId) {
        return clientRepository.findByTenantId(tenantId);
    }

    @Override
    @Transactional
    public Client save(Client client) {
        return clientRepository.save(client);
    }

    @Override
    @Transactional
    public Client update(UUID id, Client client) {
        clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client not found with id: " + id));
        client.setId(id);
        return clientRepository.save(client);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        clientRepository.deleteById(id);
    }
}
