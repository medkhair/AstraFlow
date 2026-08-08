package com.astraflow.project.controller;

import com.astraflow.project.model.User;
import com.astraflow.project.model.enums.UserStatus;
import com.astraflow.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/users")
@PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("@authorizationService.canAccessUser(authentication, #id)")
    public ResponseEntity<User> findById(@PathVariable UUID id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<User> findByEmail(@PathVariable String email) {
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/username/{username}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<User> findByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<User> updateStatus(@PathVariable UUID id, @RequestParam UserStatus status) {
        return ResponseEntity.ok(userService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/register")
    @PreAuthorize("permitAll()")
    public User register(@RequestBody User user) {

        BCryptPasswordEncoder encoder= new BCryptPasswordEncoder(12);
        user.setPassword(encoder.encode(user.getPassword()));
        return userService.save(user);
    }
    
    @PostMapping("/login")
    @PreAuthorize("permitAll()")
    public String login(@RequestBody User user) {
        return userService.verify(user);
    }
}