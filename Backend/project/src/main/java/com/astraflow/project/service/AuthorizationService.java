package com.astraflow.project.service;

import com.astraflow.project.model.Admin;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.Owner;
import com.astraflow.project.model.User;
import com.astraflow.project.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service("authorizationService")
public class AuthorizationService {

	@Autowired
    private UserRepository userRepository;

    public AuthorizationService(UserRepository userRepository) {
        this.userRepository = userRepository;
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

    private User getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated() || authentication.getName() == null) {
            return null;
        }

        return userRepository.findByUsername(authentication.getName());
    }
}