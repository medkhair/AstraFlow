package com.astraflow.project.service.impl;

import com.astraflow.project.model.SupportTicket;
import com.astraflow.project.model.enums.TicketPriority;
import com.astraflow.project.model.enums.TicketStatus;
import com.astraflow.project.repository.SupportTicketRepository;
import com.astraflow.project.service.SupportTicketService;
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
public class SupportTicketServiceImpl implements SupportTicketService {

    private final SupportTicketRepository supportTicketRepository;

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
}
