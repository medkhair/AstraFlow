package com.astraflow.project.service;

import com.astraflow.project.model.Device;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DeviceService {

    List<Device> findAll();

    Optional<Device> findById(UUID id);

    List<Device> findByClientId(UUID clientId);

    Optional<Device> findByDeviceId(String deviceId);

    Device save(Device device);

    Device update(UUID id, Device device);

    void deleteById(UUID id);
}
