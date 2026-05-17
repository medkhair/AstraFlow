package com.astraflow.project.controller;

import com.astraflow.project.service.M3uImportService;
import com.astraflow.project.dto.M3uImportResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/m3u")
public class M3uImportController {

    @Autowired
    private M3uImportService m3uImportService;

    @PostMapping("/import")
    public ResponseEntity<M3uImportResult> importPlaylist(
            @RequestParam String url,
            @RequestParam UUID tenantId) {
        M3uImportResult result = m3uImportService.importFromUrl(url, tenantId);
        return ResponseEntity.ok(result);
    }
}