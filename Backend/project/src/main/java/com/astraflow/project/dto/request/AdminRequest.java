package com.astraflow.project.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminRequest {

    private UUID tenantId;
    private String email;
    private String password;
    private String fullName;
    private String phone;
    private String username;
}
