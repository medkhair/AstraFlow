package com.astraflow.project.repository;

import com.astraflow.project.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DeviceRepository extends JpaRepository<Device, UUID> {

    List<Device> findByClientId(UUID clientId);

    Optional<Device> findByDeviceId(String deviceId);

    boolean existsByDeviceIdAndClientId(String deviceId, UUID clientId);
}
