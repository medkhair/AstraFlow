package com.astraflow.project.dto.response;

import com.astraflow.project.model.enums.UserStatus;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
public class ClientResponse {

    private UUID id;
    private UUID tenantId;
    private String email;
    private String fullName;
    private String phone;
    private String username;
    private UserStatus status;
    private boolean emailVerified;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ClientResponse(UUID id, UUID tenantId, String email, String fullName, String phone, String username, UserStatus status, boolean emailVerified, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.tenantId = tenantId;
        this.email = email;
        this.fullName = fullName;
        this.phone = phone;
        this.username = username;
        this.status = status;
        this.emailVerified = emailVerified;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    

    public UUID getId() {
		return id;
	}



	public void setId(UUID id) {
		this.id = id;
	}



	public UUID getTenantId() {
		return tenantId;
	}



	public void setTenantId(UUID tenantId) {
		this.tenantId = tenantId;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getFullName() {
		return fullName;
	}



	public void setFullName(String fullName) {
		this.fullName = fullName;
	}



	public String getPhone() {
		return phone;
	}



	public void setPhone(String phone) {
		this.phone = phone;
	}



	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}



	public UserStatus getStatus() {
		return status;
	}



	public void setStatus(UserStatus status) {
		this.status = status;
	}



	public boolean isEmailVerified() {
		return emailVerified;
	}



	public void setEmailVerified(boolean emailVerified) {
		this.emailVerified = emailVerified;
	}



	public LocalDateTime getCreatedAt() {
		return createdAt;
	}



	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}



	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}



	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}



	public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private UUID id;
        private UUID tenantId;
        private String email;
        private String fullName;
        private String phone;
        private String username;
        private UserStatus status;
        private boolean emailVerified;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(UUID id) {
            this.id = id;
            return this;
        }

        public Builder tenantId(UUID tenantId) {
            this.tenantId = tenantId;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder status(UserStatus status) {
            this.status = status;
            return this;
        }

        public Builder emailVerified(boolean emailVerified) {
            this.emailVerified = emailVerified;
            return this;
        }

        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public ClientResponse build() {
            return new ClientResponse(id, tenantId, email, fullName, phone, username, status, emailVerified, createdAt, updatedAt);
        }
        
    }
}



