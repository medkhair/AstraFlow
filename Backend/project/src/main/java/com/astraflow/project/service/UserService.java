package com.astraflow.project.service;

import com.astraflow.project.model.User;
import com.astraflow.project.model.enums.UserStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {

    List<User> findAll();

    Optional<User> findById(UUID id);

    Optional<User> findByEmail(String email);

    User findByUsername(String username);

    boolean existsByEmail(String email);

    User updateStatus(UUID id, UserStatus status);

    void deleteById(UUID id);

    User save(User user);

    String verify(User user);
}