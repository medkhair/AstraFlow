package com.astraflow.project.controller;

import com.astraflow.project.service.M3uImportService;
import com.astraflow.project.dto.M3uImportResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/m3u")
public class M3uImportController {

    @Autowired
    private M3uImportService m3uImportService;

    @PostMapping("/import")
    public ResponseEntity<M3uImportResult> importFromUrl(
            @RequestParam String url,
            @RequestParam UUID tenantId) {
        return ResponseEntity.ok(m3uImportService.importFromUrl(url, tenantId));
    }

    @PostMapping(value = "/import/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<M3uImportResult> importFromFile(
            @RequestParam MultipartFile file,
            @RequestParam UUID tenantId) {
        return ResponseEntity.ok(m3uImportService.importFromFile(file, tenantId));
    }
}