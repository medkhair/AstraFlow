package com.astraflow.project.service.impl;

import com.astraflow.project.model.Admin;
import com.astraflow.project.repository.AdminRepository;
import com.astraflow.project.service.AdminService;
import com.astraflow.project.service.JwtService;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private AuthenticationManager authManager;
    
    @Autowired
    private JwtService jwtService;

    @Override
    public List<Admin> findAll() {
        return adminRepository.findAll();
    }

    @Override
    public Optional<Admin> findById(UUID id) {
        return adminRepository.findById(id);
    }

    @Override
    public Optional<Admin> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    @Override
    public List<Admin> findByTenantId(UUID tenantId) {
        return adminRepository.findByTenantId(tenantId);
    }

    @Override
    @Transactional
    public Admin save(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    @Transactional
    public Admin update(UUID id, Admin admin) {
        adminRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Admin not found with id: " + id));
        admin.setId(id);
        return adminRepository.save(admin);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        adminRepository.deleteById(id);
    }

	@Override
	public String verify(Admin user) {
		Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getUsername());
        } else {
            return "fail";
        }
	}
}
