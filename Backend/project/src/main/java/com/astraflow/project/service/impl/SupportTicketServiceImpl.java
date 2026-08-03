package com.astraflow.project.service.impl;

import com.astraflow.project.dto.request.SupportTicketRequest;
import com.astraflow.project.dto.response.SupportTicketResponse;
import com.astraflow.project.mapper.SupportTicketMapper;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.SupportTicket;
import com.astraflow.project.model.Tenant;
import com.astraflow.project.model.enums.TicketPriority;
import com.astraflow.project.model.enums.TicketStatus;
import com.astraflow.project.repository.ClientRepository;
import com.astraflow.project.repository.SupportTicketRepository;
import com.astraflow.project.repository.TenantRepository;
import com.astraflow.project.service.SupportTicketService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class SupportTicketServiceImpl implements SupportTicketService {

    @Autowired
    private SupportTicketRepository supportTicketRepository;
    
    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<SupportTicket> findAll() {
        return supportTicketRepository.findAll();
    }

    @Override
    public Optional<SupportTicket> findById(UUID id) {
        return supportTicketRepository.findById(id);
    }

    @Override
    public List<SupportTicket> findByTenantId(UUID tenantId) {
        return supportTicketRepository.findByTenantId(tenantId);
    }

    @Override
    public List<SupportTicket> findByClientId(UUID clientId) {
        return supportTicketRepository.findByClientId(clientId);
    }

    @Override
    public List<SupportTicket> findByAdminId(UUID adminId) {
        return supportTicketRepository.findByAdminId(adminId);
    }

    @Override
    public List<SupportTicket> findByTenantIdAndStatus(UUID tenantId, TicketStatus status) {
        return supportTicketRepository.findByTenantIdAndStatus(tenantId, status);
    }

    @Override
    public List<SupportTicket> findByTenantIdAndPriority(UUID tenantId, TicketPriority priority) {
        return supportTicketRepository.findByTenantIdAndPriority(tenantId, priority);
    }

    @Override
    @Transactional
    public SupportTicket save(SupportTicket ticket) {
        return supportTicketRepository.save(ticket);
    }

    @Override
    @Transactional
    public SupportTicket update(UUID id, SupportTicket ticket) {
        supportTicketRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("SupportTicket not found with id: " + id));
        ticket.setId(id);
        return supportTicketRepository.save(ticket);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        supportTicketRepository.deleteById(id);
    }
    
    
    @Override
    @Transactional
    public SupportTicketResponse create(SupportTicketRequest request) {

        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() -> new EntityNotFoundException("Tenant not found"));

        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> new EntityNotFoundException("Client not found"));

        SupportTicket ticket = SupportTicketMapper.toEntity(request, tenant, client);
        
        ticket.setStatus(TicketStatus.OPEN);
        
        ticket.setPriority(TicketPriority.HIGH);
        
        supportTicketRepository.save(ticket);

        return SupportTicketMapper.toResponse(ticket);
    }
    
    @Override
    @Transactional
    public SupportTicketResponse change(UUID id, SupportTicketRequest request) {

        SupportTicket ticket = supportTicketRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("SupportTicket not found"));

        ticket.setSubject(request.getSubject());
        ticket.setMessage(request.getMessage());
        
        
        ticket = supportTicketRepository.save(ticket);

        return SupportTicketMapper.toResponse(ticket);
    }
    
    @Override
    public List<SupportTicketResponse> fetchAll() {

        return supportTicketRepository.findAll()
                .stream()
                .map(SupportTicketMapper::toResponse)
                .toList();
    }


    // =========================
    // FIND BY ID
    // =========================

    @Override
    public Optional<SupportTicketResponse> fetchById(UUID id) {

        return supportTicketRepository.findById(id)
                .map(SupportTicketMapper::toResponse);
    }


    // =========================
    // FIND BY TENANT
    // =========================

    @Override
    public List<SupportTicketResponse> fetchByTenantId(UUID tenantId) {

        return supportTicketRepository
                .findByTenantId(tenantId)
                .stream()
                .map(SupportTicketMapper::toResponse)
                .toList();
    }


    // =========================
    // FIND BY CLIENT
    // =========================

    @Override
    public List<SupportTicketResponse> fetchByClientId(UUID clientId) {

        return supportTicketRepository
                .findByClientId(clientId)
                .stream()
                .map(SupportTicketMapper::toResponse)
                .toList();
    }


    // =========================
    // FIND BY ADMIN
    // =========================

    @Override
    public List<SupportTicketResponse> fetchByAdminId(UUID adminId) {

        return supportTicketRepository
                .findByAdminId(adminId)
                .stream()
                .map(SupportTicketMapper::toResponse)
                .toList();
    }


    // =========================
    // FIND BY TENANT + STATUS
    // =========================

    @Override
    public List<SupportTicketResponse> fetchByTenantIdAndStatus(
            UUID tenantId,
            TicketStatus status
    ) {

        return supportTicketRepository
                .findByTenantIdAndStatus(tenantId, status)
                .stream()
                .map(SupportTicketMapper::toResponse)
                .toList();
    }


    // =========================
    // FIND BY TENANT + PRIORITY
    // =========================

    @Override
    public List<SupportTicketResponse> fetchByTenantIdAndPriority(
            UUID tenantId,
            TicketPriority priority
    ) {

        return supportTicketRepository
                .findByTenantIdAndPriority(tenantId, priority)
                .stream()
                .map(SupportTicketMapper::toResponse)
                .toList();
    }

    
}
