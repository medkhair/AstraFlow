package com.astraflow.project.dto.request;

import com.astraflow.project.model.enums.DeviceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeviceRequest {

    private UUID clientId;
    private DeviceType deviceType;
    private String deviceName;
    private String deviceId;
}
