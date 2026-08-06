package com.astraflow.project.service.impl;

import com.astraflow.project.dto.request.ClientRequest;
import com.astraflow.project.dto.response.ClientResponse;
import com.astraflow.project.mapper.ClientMapper;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.Tenant;
import com.astraflow.project.model.VerificationCode;
import com.astraflow.project.model.enums.UserStatus;
import com.astraflow.project.repository.ClientRepository;
import com.astraflow.project.repository.TenantRepository;
import com.astraflow.project.service.ClientService;
import com.astraflow.project.service.EmailService;
import com.astraflow.project.service.JwtService;
import com.astraflow.project.service.VerificationCodeService;

import jakarta.persistence.EntityNotFoundException;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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
    private EmailService emailService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ClientMapper clientMapper;

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

        if (client.getTenant() != null && client.getTenant().getId() != null) {
            if (clientRepository.existsByEmailAndTenantId(client.getEmail(), client.getTenant().getId())) {
                throw new IllegalArgumentException("Email already exists for this tenant");
            }
            if (clientRepository.existsByUsernameAndTenantId(client.getUsername(), client.getTenant().getId())) {
                throw new IllegalArgumentException("Username already exists for this tenant");
            }
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        client.setPassword(encoder.encode(client.getPassword()));

        client.setStatus(UserStatus.INACTIVE);
        client.setEmailVerified(false);

        Client savedClient = clientRepository.save(client);
        VerificationCode verificationCode = verificationCodeService.createVerificationCode(savedClient);
        emailService.sendVerificationEmail(savedClient.getEmail(), verificationCode.getCode());
        return savedClient;
    }

    @Override
    @Transactional
    public Client update(UUID id, Client client) {
        Client existing = clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client not found with id: " + id));

        existing.setEmail(client.getEmail());
        existing.setFullName(client.getFullName());
        existing.setPhone(client.getPhone());
        existing.setUsername(client.getUsername());

        if (client.getTenant() != null && client.getTenant().getId() != null) {
            Tenant managedTenant = tenantRepository.findById(client.getTenant().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Tenant not found"));
            existing.setTenant(managedTenant);
        }

        if (client.getPassword() != null && !client.getPassword().isBlank()) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
            existing.setPassword(encoder.encode(client.getPassword()));
        }

        return clientRepository.save(existing);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        clientRepository.deleteById(id);
    }

    @Override
    public String verify(Client user) {
        if (user == null) {
            throw new IllegalArgumentException("Login request body is required");
        }

        String identifier = Optional.ofNullable(user.getUsername())
                .filter(value -> !value.isBlank())
                .orElseGet(() -> Optional.ofNullable(user.getEmail())
                        .filter(value -> !value.isBlank())
                        .orElseThrow(() -> new IllegalArgumentException("Username or email is required")));

        String password = Optional.ofNullable(user.getPassword())
                .filter(value -> !value.isBlank())
                .orElseThrow(() -> new IllegalArgumentException("Password is required"));

        System.out.println("Client login attempt received for identifier={}"+ identifier);

        Client client = clientRepository.findByUsername(identifier)
                .or(() -> clientRepository.findByEmail(identifier))
                .orElseThrow();

        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(client.getUsername(), password)
            );

            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(client.getUsername(), client.getId());
                System.out.println("Client login succeeded for clientId={}, username={}"+ client.getId()+ client.getUsername());
                return token;
            }
        } catch (AuthenticationException ex) {
        	System.out.println("Client login failed for clientId={} due to {}"+ client.getId()+ ex.getMessage()+ ex);
            throw new BadCredentialsException("Invalid username/email or password", ex);
        }

        System.out.println("Client login failed for clientId={} because authentication was not completed"+ client.getId());
        throw new BadCredentialsException("Invalid username/email or password");
    }
    public boolean verifyEmail(String email, UUID tenantId) {
        return clientRepository.existsByEmailAndTenantId(email, tenantId);
    }

    public boolean verifyUsername(String username, UUID tenantId) {
        return clientRepository.existsByUsernameAndTenantId(username, tenantId);
    }

    @Override
    public @Nullable Object isEmailVerified(UUID clientId) {
        return clientRepository.findById(clientId)
                .map(Client::isEmailVerified)
                .orElse(null);
    }

    @Override
    @Transactional
    public ClientResponse create(ClientRequest request) {
        Client client = clientMapper.toEntity(request);
        Client saved = save(client);
        return clientMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public ClientResponse update(UUID id, ClientRequest request) {
        Client existing = clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client not found with id: " + id));

        clientMapper.updateEntityFromRequest(existing, request);

        if (existing.getTenant() != null && existing.getTenant().getId() != null) {
            Tenant managedTenant = tenantRepository.findById(existing.getTenant().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Tenant not found"));
            existing.setTenant(managedTenant);
        }

        Client saved = clientRepository.save(existing);
        return clientMapper.toResponse(saved);
    }

    @Override
    public Optional<ClientResponse> findResponseById(UUID id) {
        return clientRepository.findById(id)
                .map(clientMapper::toResponse);
    }

    @Override
    public List<ClientResponse> findAllResponses() {
        return clientRepository.findAll()
                .stream()
                .map(clientMapper::toResponse)
                .toList();
    }

    @Override
    public List<ClientResponse> findByTenantIdResponses(UUID tenantId) {
        return clientRepository.findByTenantId(tenantId)
                .stream()
                .map(clientMapper::toResponse)
                .toList();
    }

	@Override
	public void changePassword(UUID id,  String currentPassword, String newPassword) {
		BCryptPasswordEncoder encoder= new BCryptPasswordEncoder(12);
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Admin not found"));
        if (!encoder.matches(currentPassword, client.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }
        client.setPassword(encoder.encode(newPassword));
        clientRepository.save(client);
		
	}
}