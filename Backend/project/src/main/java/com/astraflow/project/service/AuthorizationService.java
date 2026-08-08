package com.astraflow.project.service;

import com.astraflow.project.model.Admin;
import com.astraflow.project.dto.request.FavoriteRequest;
import com.astraflow.project.dto.request.SupportTicketRequest;

import com.astraflow.project.model.Branding;
import com.astraflow.project.model.Channel;
import com.astraflow.project.model.ChannelCategory;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.Device;
import com.astraflow.project.model.Favorite;
import com.astraflow.project.model.Owner;
import com.astraflow.project.model.Payment;
import com.astraflow.project.model.Plan;
import com.astraflow.project.model.Subscription;
import com.astraflow.project.model.SupportTicket;
import com.astraflow.project.model.User;
import com.astraflow.project.model.Tenant;
import com.astraflow.project.repository.BrandingRepository;
import com.astraflow.project.repository.ChannelCategoryRepository;
import com.astraflow.project.repository.ChannelRepository;
import com.astraflow.project.repository.DeviceRepository;
import com.astraflow.project.repository.FavoriteRepository;
import com.astraflow.project.repository.PaymentRepository;
import com.astraflow.project.repository.PlanRepository;
import com.astraflow.project.repository.SubscriptionRepository;
import com.astraflow.project.repository.SupportTicketRepository;
import com.astraflow.project.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service("authorizationService")
public class AuthorizationService {

    private final UserRepository userRepository;
    private final BrandingRepository brandingRepository;
    private final ChannelRepository channelRepository;
    private final ChannelCategoryRepository channelCategoryRepository;
    private final DeviceRepository deviceRepository;
    private final FavoriteRepository favoriteRepository;
    private final PaymentRepository paymentRepository;
    private final PlanRepository planRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final SupportTicketRepository supportTicketRepository;

    public AuthorizationService(
            UserRepository userRepository,
            BrandingRepository brandingRepository,
            ChannelRepository channelRepository,
            ChannelCategoryRepository channelCategoryRepository,
            DeviceRepository deviceRepository,
            FavoriteRepository favoriteRepository,
            PaymentRepository paymentRepository,
            PlanRepository planRepository,
            SubscriptionRepository subscriptionRepository,
            SupportTicketRepository supportTicketRepository) {
        this.userRepository = userRepository;
        this.brandingRepository = brandingRepository;
        this.channelRepository = channelRepository;
        this.channelCategoryRepository = channelCategoryRepository;
        this.deviceRepository = deviceRepository;
        this.favoriteRepository = favoriteRepository;
        this.paymentRepository = paymentRepository;
        this.planRepository = planRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.supportTicketRepository = supportTicketRepository;
    }

    public boolean isOwner(Authentication authentication) {
        return getCurrentUser(authentication) instanceof Owner;
    }

    public boolean isAdmin(Authentication authentication) {
        return getCurrentUser(authentication) instanceof Admin;
    }

    public boolean isClient(Authentication authentication) {
        return getCurrentUser(authentication) instanceof Client;
    }

    public boolean isCurrentUser(Authentication authentication, UUID userId) {
        User user = getCurrentUser(authentication);
        return user != null && user.getId().equals(userId);
    }

    public boolean isCurrentClient(Authentication authentication, UUID clientId) {
        User user = getCurrentUser(authentication);
        return user instanceof Client && user.getId().equals(clientId);
    }

    public boolean canAccessTenant(Authentication authentication, UUID tenantId) {

        User user = getCurrentUser(authentication);

        if (user instanceof Owner) {
            return true;
        }

        if (user instanceof Admin admin) {
        	System.out.println(" STATUS ::::>>>> "+admin.getTenant() != null && admin.getTenant().getId().equals(tenantId));
   
            return admin.getTenant() != null && admin.getTenant().getId().equals(tenantId);
        }

        if (user instanceof Client client) {
            return client.getTenant() != null && client.getTenant().getId().equals(tenantId);
        }

        return false;
    }

    public boolean canManageTenant(
            Authentication authentication,
            UUID tenantId) {

        User user = getCurrentUser(authentication);

        if (user instanceof Owner) {
            return true;
        }

        return user instanceof Admin admin && admin.getTenant() != null && admin.getTenant().getId().equals(tenantId);
    }

    public boolean canAccessUser( Authentication authentication, UUID userId) {

        User currentUser = getCurrentUser(authentication);

        if (currentUser instanceof Owner) {
            return true;
        }

        if (currentUser instanceof Client) {
            return currentUser.getId().equals(userId);
        }

        if (currentUser instanceof Admin admin) {
            User requestedUser = userRepository.findById(userId).orElse(null);

            if (requestedUser == null || admin.getTenant() == null) {
                return false;
            }

            if (requestedUser instanceof Admin requestedAdmin) {
                return requestedAdmin.getTenant() != null && requestedAdmin.getTenant().getId().equals(admin.getTenant().getId());
            }

            if (requestedUser instanceof Client requestedClient) {
                return requestedClient.getTenant() != null && requestedClient.getTenant().getId().equals(admin.getTenant().getId());
            }

            return false;
        }

        return false;
    }

    public boolean canAccessClient(Authentication authentication, UUID clientId) {
        User currentUser = getCurrentUser(authentication);
        Client client = findClient(clientId);

        if (currentUser instanceof Owner) {
            return client != null;
        }

        if (currentUser instanceof Client) {
            return currentUser.getId().equals(clientId);
        }

        return currentUser instanceof Admin admin
                && client != null
                && sameTenant(admin, client.getTenant());
    }

    public boolean canModifyClient(Authentication authentication, UUID clientId) {
        User currentUser = getCurrentUser(authentication);
        if (currentUser instanceof Owner) {
            return true;
        }

        Client client = findClient(clientId);
        return currentUser instanceof Admin admin && client != null
                && sameTenant(admin, client.getTenant());
    }

    public boolean canManageBranding(Authentication authentication, UUID brandingId) {
        Branding branding = brandingRepository.findById(brandingId).orElse(null);
        return branding != null && canManageTenant(authentication, tenantId(branding.getTenant()));
    }

    public boolean canAccessBranding(Authentication authentication, UUID brandingId) {
        Branding branding = brandingRepository.findById(brandingId).orElse(null);
        return branding != null && canAccessTenant(authentication, tenantId(branding.getTenant()));
    }

    public boolean canAccessChannel(Authentication authentication, UUID channelId) {
        Channel channel = channelRepository.findById(channelId).orElse(null);
        return channel != null && canAccessTenant(authentication, tenantId(channel.getTenant()));
    }

    public boolean canManageChannel(Authentication authentication, UUID channelId) {
        Channel channel = channelRepository.findById(channelId).orElse(null);
        return channel != null && canManageTenant(authentication, tenantId(channel.getTenant()));
    }

    public boolean canAccessCategory(Authentication authentication, UUID categoryId) {
        ChannelCategory category = channelCategoryRepository.findById(categoryId).orElse(null);
        return category != null && canAccessTenant(authentication, tenantId(category.getTenant()));
    }

    public boolean canManageCategory(Authentication authentication, UUID categoryId) {
        ChannelCategory category = channelCategoryRepository.findById(categoryId).orElse(null);
        return category != null && canManageTenant(authentication, tenantId(category.getTenant()));
    }

    public boolean canAccessDevice(Authentication authentication, UUID deviceId) {
        Device device = deviceRepository.findById(deviceId).orElse(null);
        return device != null && canAccessClient(authentication, clientId(device.getClient()));
    }

    public boolean canAccessDeviceByDeviceId(Authentication authentication, String deviceId) {
        Device device = deviceRepository.findByDeviceId(deviceId).orElse(null);
        return device != null && canAccessClient(authentication, clientId(device.getClient()));
    }

    public boolean canManageDevice(Authentication authentication, UUID deviceId) {
        Device device = deviceRepository.findById(deviceId).orElse(null);
        return device != null && canManageClientResource(authentication, device.getClient());
    }

    public boolean canAccessFavorite(Authentication authentication, UUID favoriteId) {
        Favorite favorite = favoriteRepository.findById(favoriteId).orElse(null);
        return favorite != null && canAccessClient(authentication, clientId(favorite.getClient()));
    }

    public boolean canCreateFavorite(Authentication authentication, Favorite favorite) {
        return favorite != null
                && favorite.getClient() != null
                && canAccessClient(authentication, clientId(favorite.getClient()));
    }

    public boolean canCreateFavorite(Authentication authentication, FavoriteRequest favorite) {
        return favorite != null && canAccessClient(authentication, favorite.getClientId());
    }

    public boolean canManagePlan(Authentication authentication, UUID planId) {
        Plan plan = planRepository.findById(planId).orElse(null);
        return plan != null && canManageTenant(authentication, tenantId(plan.getTenant()));
    }

    public boolean canAccessPlan(Authentication authentication, UUID planId) {
        Plan plan = planRepository.findById(planId).orElse(null);
        return plan != null && canAccessTenant(authentication, tenantId(plan.getTenant()));
    }

    public boolean canAccessSubscription(Authentication authentication, UUID subscriptionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId).orElse(null);
        return subscription != null && canAccessClient(authentication, clientId(subscription.getClient()));
    }

    public boolean canManageSubscription(Authentication authentication, UUID subscriptionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId).orElse(null);
        return subscription != null && canManageTenant(authentication, tenantId(subscription.getTenant()));
    }

    public boolean canAccessPayment(Authentication authentication, UUID paymentId) {
        Payment payment = paymentRepository.findById(paymentId).orElse(null);
        if (payment == null) {
            return false;
        }

        User currentUser = getCurrentUser(authentication);
        if (currentUser instanceof Client) {
            return payment.getSubscription() != null
                    && canAccessClient(authentication, clientId(payment.getSubscription().getClient()));
        }

        return canAccessTenant(authentication, tenantId(payment.getTenant()));
    }

    public boolean canCreateTicket(Authentication authentication, SupportTicket ticket) {
        return ticket != null
                && ticket.getClient() != null
                && canAccessClient(authentication, clientId(ticket.getClient()));
    }

    public boolean canCreateTicket(Authentication authentication, SupportTicketRequest ticket) {
        return ticket != null
                && canAccessClient(authentication, ticket.getClientId())
                && canAccessTenant(authentication, ticket.getTenantId());
    }

    public boolean canAccessTicket(Authentication authentication, UUID ticketId) {
        SupportTicket ticket = supportTicketRepository.findById(ticketId).orElse(null);
        return ticket != null && canAccessTenant(authentication, tenantId(ticket.getTenant()));
    }

    public boolean canManageTicket(Authentication authentication, UUID ticketId) {
        SupportTicket ticket = supportTicketRepository.findById(ticketId).orElse(null);
        return ticket != null && canManageTenant(authentication, tenantId(ticket.getTenant()));
    }

    private boolean canManageClientResource(Authentication authentication, Client client) {
        User currentUser = getCurrentUser(authentication);
        return currentUser instanceof Owner
                || currentUser instanceof Admin admin && client != null
                && sameTenant(admin, client.getTenant());
    }

    private Client findClient(UUID clientId) {
        return clientId == null ? null : userRepository.findById(clientId)
                .filter(Client.class::isInstance)
                .map(Client.class::cast)
                .orElse(null);
    }

    private boolean sameTenant(Admin admin, Tenant tenant) {
        return admin.getTenant() != null
                && tenant != null
                && admin.getTenant().getId().equals(tenant.getId());
    }

    private UUID tenantId(Tenant tenant) {
        return tenant == null ? null : tenant.getId();
    }

    private UUID clientId(Client client) {
        return client == null ? null : client.getId();
    }

    private User getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated() || authentication.getName() == null) {
            return null;
        }

        return userRepository.findByUsername(authentication.getName());
    }

    private void onlyOwnerOrAdminCanAccess(Authentication authentication) {
        User currentUser = getCurrentUser(authentication);
        if (!(currentUser instanceof Owner || currentUser instanceof Admin)) {
            throw new SecurityException("Access denied: Only owners or admins can access this resource.");
        }
    }

    private void onlyOwnerCanAccess(Authentication authentication) {
        User currentUser = getCurrentUser(authentication);
        if (!(currentUser instanceof Owner)) {
            throw new SecurityException("Access denied: Only owners can access this resource.");
        }
    }

    private void onlyAdminCanAccess(Authentication authentication) {
        User currentUser = getCurrentUser(authentication);
        if (!(currentUser instanceof Admin)) {
            throw new SecurityException("Access denied: Only admins can access this resource.");
        }
    }

    private void onlyClientCanAccess(Authentication authentication) {
        User currentUser = getCurrentUser(authentication);
        if (!(currentUser instanceof Client)) {
            throw new SecurityException("Access denied: Only clients can access this resource.");
        }
    }
}