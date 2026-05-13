package com.astraflow.project.service;

import com.astraflow.project.model.SupportTicket;
import com.astraflow.project.model.enums.TicketPriority;
import com.astraflow.project.model.enums.TicketStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SupportTicketService {

    List<SupportTicket> findAll();

    Optional<SupportTicket> findById(UUID id);

    List<SupportTicket> findByTenantId(UUID tenantId);

    List<SupportTicket> findByClientId(UUID clientId);

    List<SupportTicket> findByAdminId(UUID adminId);

    List<SupportTicket> findByTenantIdAndStatus(UUID tenantId, TicketStatus status);

    List<SupportTicket> findByTenantIdAndPriority(UUID tenantId, TicketPriority priority);

    SupportTicket save(SupportTicket ticket);

    SupportTicket update(UUID id, SupportTicket ticket);

    void deleteById(UUID id);
}
