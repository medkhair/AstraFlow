package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.AdminRequest;
import com.astraflow.project.dto.request.ClientRequest;
import com.astraflow.project.dto.request.OwnerRequest;
import com.astraflow.project.dto.response.AdminResponse;
import com.astraflow.project.dto.response.ClientResponse;
import com.astraflow.project.dto.response.OwnerResponse;
import com.astraflow.project.dto.response.UserResponse;
import com.astraflow.project.model.Admin;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.Owner;
import com.astraflow.project.model.Tenant;
import com.astraflow.project.model.User;

public class UserMapper {

    private UserMapper() {
    }

    public static UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .username(user.getUsername())
                .status(user.getStatus())
                .emailVerified(user.isEmailVerified())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public static Admin toAdmin(AdminRequest request) {
        if (request == null) {
            return null;
        }
        Admin admin = new Admin();
        DtoMapperUtils.mapCommonUserFields(
                admin,
                request.getEmail(),
                request.getPassword(),
                request.getFullName(),
                request.getPhone(),
                request.getUsername()
        );
        if (request.getTenantId() != null) {
            Tenant tenant = new Tenant();
            tenant.setId(request.getTenantId());
            admin.setTenant(tenant);
        }
        return admin;
    }

    public static AdminResponse toAdminResponse(Admin admin) {
        if (admin == null) {
            return null;
        }
        return AdminResponse.builder()
                .id(admin.getId())
                .tenantId(admin.getTenant() != null ? admin.getTenant().getId() : null)
                .email(admin.getEmail())
                .fullName(admin.getFullName())
                .phone(admin.getPhone())
                .username(admin.getUsername())
                .status(admin.getStatus())
                .build();
    }

    public static Client toClient(ClientRequest request) {
        if (request == null) {
            return null;
        }
        Client client = new Client();
        DtoMapperUtils.mapCommonUserFields(
                client,
                request.getEmail(),
                request.getPassword(),
                request.getFullName(),
                request.getPhone(),
                request.getUsername()
        );
        if (request.getTenantId() != null) {
            Tenant tenant = new Tenant();
            tenant.setId(request.getTenantId());
            client.setTenant(tenant);
        }
        return client;
    }

    public static ClientResponse toClientResponse(Client client) {
        if (client == null) {
            return null;
        }
        return ClientResponse.builder()
                .id(client.getId())
                .tenantId(client.getTenant() != null ? client.getTenant().getId() : null)
                .email(client.getEmail())
                .fullName(client.getFullName())
                .phone(client.getPhone())
                .username(client.getUsername())
                .status(client.getStatus())
                .emailVerified(client.isEmailVerified())
                .createdAt(client.getCreatedAt())
                .updatedAt(client.getUpdatedAt())
                .build();
    }

    public static Owner toOwner(OwnerRequest request) {
        if (request == null) {
            return null;
        }
        Owner owner = new Owner();
        DtoMapperUtils.mapCommonUserFields(
                owner,
                request.getEmail(),
                request.getPassword(),
                request.getFullName(),
                request.getPhone(),
                request.getUsername()
        );
        owner.setCompanyName(request.getCompanyName());
        return owner;
    }

    public static OwnerResponse toOwnerResponse(Owner owner) {
        if (owner == null) {
            return null;
        }
        return OwnerResponse.builder()
                .id(owner.getId())
                .email(owner.getEmail())
                .fullName(owner.getFullName())
                .phone(owner.getPhone())
                .username(owner.getUsername())
                .companyName(owner.getCompanyName())
                .status(owner.getStatus())
                .createdAt(owner.getCreatedAt())
                .updatedAt(owner.getUpdatedAt())
                .build();
    }
}