package com.astraflow.project.repository;

import com.astraflow.project.model.SupportTicket;
import com.astraflow.project.model.enums.TicketPriority;
import com.astraflow.project.model.enums.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, UUID> {

    List<SupportTicket> findByTenantId(UUID tenantId);

    List<SupportTicket> findByClientId(UUID clientId);

    List<SupportTicket> findByAdminId(UUID adminId);

    List<SupportTicket> findByTenantIdAndStatus(UUID tenantId, TicketStatus status);

    List<SupportTicket> findByTenantIdAndPriority(UUID tenantId, TicketPriority priority);
}
