package com.astraflow.project.dto;

import com.astraflow.project.model.enums.DeviceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeviceResponse {

    private UUID id;
    private UUID clientId;
    private DeviceType deviceType;
    private String deviceName;
    private String deviceId;
    private LocalDateTime lastActiveAt;
    private LocalDateTime createdAt;
}
