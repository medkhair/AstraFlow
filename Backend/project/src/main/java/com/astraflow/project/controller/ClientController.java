package com.astraflow.project.controller;


import com.astraflow.project.model.Client;
import com.astraflow.project.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public ResponseEntity<List<Client>> findAll() {
        return ResponseEntity.ok(clientService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> findById(@PathVariable UUID id) {
        return clientService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<Client>> findByTenantId(@PathVariable UUID tenantId) {
        return ResponseEntity.ok(clientService.findByTenantId(tenantId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> update(@PathVariable UUID id, @RequestBody Client client) {
        return ResponseEntity.ok(clientService.update(id, client));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        clientService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    
    @PostMapping("/register")
    public ResponseEntity<Client> register(@RequestBody Client client) {
    	
    	BCryptPasswordEncoder encoder= new BCryptPasswordEncoder(12);
        client.setPassword(encoder.encode(client.getPassword()));
        return ResponseEntity.status(HttpStatus.CREATED).body(
    
        		clientService.save(client)
        		
        		);
    }
    
    @PostMapping("/login")
    public String login(@RequestBody Client user) {
        return clientService.verify(user);
    }

    
}
