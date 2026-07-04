package com.astraflow.project.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OwnerRequest {

    private String email;
    private String password;
    private String fullName;
    private String phone;
    private String username;
    private String companyName;
}
