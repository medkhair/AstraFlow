package com.astraflow.project.service.impl;

import com.astraflow.project.model.Device;
import com.astraflow.project.repository.DeviceRepository;
import com.astraflow.project.service.DeviceService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class DeviceServiceImpl implements DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Override
    public List<Device> findAll() {
        return deviceRepository.findAll();
    }

    @Override
    public Optional<Device> findById(UUID id) {
        return deviceRepository.findById(id);
    }

    @Override
    public List<Device> findByClientId(UUID clientId) {
        return deviceRepository.findByClientId(clientId);
    }

    @Override
    public Optional<Device> findByDeviceId(String deviceId) {
        return deviceRepository.findByDeviceId(deviceId);
    }

    @Override
    @Transactional
    public Device save(Device device) {
        return deviceRepository.save(device);
    }

    @Override
    @Transactional
    public Device update(UUID id, Device device) {
        deviceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Device not found with id: " + id));
        device.setId(id);
        return deviceRepository.save(device);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        deviceRepository.deleteById(id);
    }
}
