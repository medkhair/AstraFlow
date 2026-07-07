package com.astraflow.project.mapper;

import com.astraflow.project.dto.request.DeviceRequest;
import com.astraflow.project.dto.response.DeviceResponse;
import com.astraflow.project.model.Client;
import com.astraflow.project.model.Device;

public class DeviceMapper {

    private DeviceMapper() {
    }

    public static Device toDevice(DeviceRequest request) {
        if (request == null) {
            return null;
        }
        Device device = new Device();
        device.setDeviceType(request.getDeviceType());
        device.setDeviceName(request.getDeviceName());
        device.setDeviceId(request.getDeviceId());

        if (request.getClientId() != null) {
            Client client = new Client();
            client.setId(request.getClientId());
            device.setClient(client);
        }
        return device;
    }

    public static DeviceResponse toDeviceResponse(Device device) {
        if (device == null) {
            return null;
        }
        return DeviceResponse.builder()
                .id(device.getId())
                .clientId(device.getClient() != null ? device.getClient().getId() : null)
                .deviceType(device.getDeviceType())
                .deviceName(device.getDeviceName())
                .deviceId(device.getDeviceId())
                .lastActiveAt(device.getLastActiveAt())
                .createdAt(device.getCreatedAt())
                .build();
    }
}