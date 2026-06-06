package com.astraflow.project.service.impl;


import com.astraflow.project.model.Client;
import com.astraflow.project.model.Tenant;
import com.astraflow.project.model.enums.UserStatus;
import com.astraflow.project.repository.ClientRepository;
import com.astraflow.project.repository.TenantRepository;
import com.astraflow.project.service.ClientService;
import com.astraflow.project.service.JwtService;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    
    @Autowired
    private TenantRepository tenantRepository;
    
    @Autowired
    private AuthenticationManager authManager;
    
    @Autowired
    private JwtService jwtService;

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
        if (client.getTenant() != null && client.getTenant().getId() != null) {
            Tenant managedTenant = tenantRepository.findById(client.getTenant().getId())
                .orElseThrow(() -> new EntityNotFoundException("Tenant not found"));
            client.setTenant(managedTenant);
        }

        if(clientRepository.existsByEmailAndTenantId(client.getEmail(), client.getTenant().getId())) {
            throw new IllegalArgumentException("Email already exists for this tenant");
        }
        if(clientRepository.existsByUsernameAndTenantId(client.getUsername(), client.getTenant().getId())) {
            throw new IllegalArgumentException("Username already exists for this tenant");
        }
        
        BCryptPasswordEncoder encoder= new BCryptPasswordEncoder(12);
        client.setPassword(encoder.encode(client.getPassword()));
        
        client.setStatus(UserStatus.INACTIVE);        
        
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

	@Override
	public String verify(Client user) {
		Authentication authentication = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );
        if (authentication.isAuthenticated()) {
            Client client = clientRepository.findByUsername(user.getUsername())
                    .orElseThrow(() -> new EntityNotFoundException("Admin not found"));
            return jwtService.generateToken(client.getUsername(), client.getId());
        } else {
            return "fail";
        }
	}
	
	public boolean verifyEmail(String email, UUID tenantId) {
		
		return clientRepository.existsByEmailAndTenantId(email, tenantId);
	}
	
	public boolean verifyUsername(String username, UUID tenantId) {
		
		return clientRepository.existsByUsernameAndTenantId(username, tenantId);
	}
}
