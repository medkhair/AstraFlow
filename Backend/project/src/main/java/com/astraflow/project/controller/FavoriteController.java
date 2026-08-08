package com.astraflow.project.controller;

import com.astraflow.project.dto.request.FavoriteRequest;
import com.astraflow.project.dto.response.FavoriteResponse;
import com.astraflow.project.model.Favorite;
import com.astraflow.project.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/favorites")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'CLIENT')")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/client/{clientId}")
    @PreAuthorize("@authorizationService.canAccessClient(authentication, #clientId)")
    public ResponseEntity<List<Favorite>> findByClientId(@PathVariable UUID clientId) {
        return ResponseEntity.ok(favoriteService.findByClientId(clientId));
    }

    @GetMapping("/client/{clientId}/channel/{channelId}/exists")
    @PreAuthorize("@authorizationService.canAccessClient(authentication, #clientId)")
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
    @PreAuthorize("@authorizationService.canAccessFavorite(authentication, #id)")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        favoriteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/client/{clientId}/channel/{channelId}")
    @PreAuthorize("@authorizationService.canAccessClient(authentication, #clientId)")
    public ResponseEntity<Void> deleteByClientAndChannel(
            @PathVariable UUID clientId,
            @PathVariable UUID channelId) {
        favoriteService.deleteByClientIdAndChannelId(clientId, channelId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/client/{clientId}/all")
    @PreAuthorize("@authorizationService.canAccessClient(authentication, #clientId)")
    public ResponseEntity<List<FavoriteResponse>> findAllFavoritesByClientId(@PathVariable UUID clientId) {
        List<FavoriteResponse> favoriteResponses = favoriteService.findAllFavoritesByClientId(clientId);
        return ResponseEntity.ok(favoriteResponses);
    }

    @PostMapping("/create")
    @PreAuthorize("@authorizationService.canCreateFavorite(authentication, #favorite)")
    public ResponseEntity<FavoriteResponse> createFavorite(@RequestBody FavoriteRequest favorite) {
        FavoriteResponse favoriteResponse = favoriteService.create(favorite);
        return ResponseEntity.status(HttpStatus.CREATED).body(favoriteResponse);
    }


}
