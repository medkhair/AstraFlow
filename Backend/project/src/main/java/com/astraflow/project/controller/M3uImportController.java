package com.astraflow.project.controller;

import com.astraflow.project.service.M3uImportService;

import jakarta.persistence.EntityNotFoundException;

import com.astraflow.project.dto.M3uImportResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/m3u")
@CrossOrigin
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
public class M3uImportController {

    @Autowired
    private M3uImportService m3uImportService;

    @PostMapping("/import")
    public ResponseEntity<?> importFromUrl(
            @RequestParam String url,
            @RequestParam UUID tenantId) {

        try {
            M3uImportResult result = m3uImportService.importFromUrl(url, tenantId);
            return ResponseEntity.ok(result);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Validation Error",
                    "message", e.getMessage()
            ));

        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "error", "Not Found",
                    "message", e.getMessage()
            ));
        }
    }

    @PostMapping(value = "/import/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> importFromFile(
            @RequestParam MultipartFile file,
            @RequestParam UUID tenantId) {

        try {
            M3uImportResult result = m3uImportService.importFromFile(file, tenantId);
            return ResponseEntity.ok(result);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Validation Error",
                    "message", e.getMessage()
            ));

        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "error", "Not Found",
                    "message", e.getMessage()
            ));
        }
    }
}