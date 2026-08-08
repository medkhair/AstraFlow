package com.astraflow.project.controller;

import com.astraflow.project.model.Device;
import com.astraflow.project.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/devices")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'CLIENT')")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping
    public ResponseEntity<List<Device>> findAll() {
        return ResponseEntity.ok(deviceService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("@authorizationService.canAccessDevice(authentication, #id)")
    public ResponseEntity<Device> findById(@PathVariable UUID id) {
        return deviceService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/client/{clientId}")
    @PreAuthorize("@authorizationService.canAccessClient(authentication, #clientId)")
    public ResponseEntity<List<Device>> findByClientId(@PathVariable UUID clientId) {
        return ResponseEntity.ok(deviceService.findByClientId(clientId));
    }

    @GetMapping("/device-id/{deviceId}")
    @PreAuthorize("@authorizationService.canAccessDeviceByDeviceId(authentication, #deviceId)")
    public ResponseEntity<Device> findByDeviceId(@PathVariable String deviceId) {
        return deviceService.findByDeviceId(deviceId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Device> create(@RequestBody Device device) {
        return ResponseEntity.status(HttpStatus.CREATED).body(deviceService.save(device));
    }

    @PutMapping("/{id}")
    @PreAuthorize("@authorizationService.canManageDevice(authentication, #id)")
    public ResponseEntity<Device> update(@PathVariable UUID id, @RequestBody Device device) {
        return ResponseEntity.ok(deviceService.update(id, device));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@authorizationService.canManageDevice(authentication, #id)")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        deviceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
