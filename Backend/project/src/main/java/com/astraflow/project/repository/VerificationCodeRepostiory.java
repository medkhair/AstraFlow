package com.astraflow.project.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.astraflow.project.model.User;
import com.astraflow.project.model.VerificationCode;

public interface VerificationCodeRepostiory extends JpaRepository<VerificationCode, UUID> {

	Optional<VerificationCode> findByCode(String code);

    Optional<VerificationCode> findByUser(User user);

    void deleteByUser(User user);
}
