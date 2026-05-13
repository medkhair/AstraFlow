package com.astraflow.project.controller;

import com.astraflow.project.model.Favorite;
import com.astraflow.project.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Favorite>> findByClientId(@PathVariable UUID clientId) {
        return ResponseEntity.ok(favoriteService.findByClientId(clientId));
    }

    @GetMapping("/client/{clientId}/channel/{channelId}/exists")
    public ResponseEntity<Boolean> isFavorite(
            @PathVariable UUID clientId,
            @PathVariable UUID channelId) {
        return ResponseEntity.ok(favoriteService.isFavorite(clientId, channelId));
    }

    @PostMapping
    public ResponseEntity<Favorite> create(@RequestBody Favorite favorite) {
        return ResponseEntity.status(HttpStatus.CREATED).body(favoriteService.save(favorite));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        favoriteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/client/{clientId}/channel/{channelId}")
    public ResponseEntity<Void> deleteByClientAndChannel(
            @PathVariable UUID clientId,
            @PathVariable UUID channelId) {
        favoriteService.deleteByClientIdAndChannelId(clientId, channelId);
        return ResponseEntity.noContent().build();
    }
}
