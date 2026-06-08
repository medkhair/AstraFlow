package com.astraflow.project.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.astraflow.project.model.User;
import com.astraflow.project.model.VerificationCode;
import com.astraflow.project.repository.VerificationCodeRepostiory;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VerificationCodeService {

	@Autowired
	private VerificationCodeRepostiory repo;
	
	/**
     * Creates a new 6-digit verification code for the user.
     * Removes any existing code first.
     */
	@Transactional
	public VerificationCode createVerificationCode(User user) {

	    repo.findByUser(user)
	            .ifPresent(repo::delete);

	    VerificationCode verificationCode = new VerificationCode();

	    verificationCode.setCode(generateCode());
	    verificationCode.setExpiresAfter(
	            LocalDateTime.now().plusMinutes(15)
	    );
	    verificationCode.setUser(user);

	    return repo.save(verificationCode);
	}

    /**
     * Generates a random 6-digit OTP.
     */
    private String generateCode() {
        return String.format(
                "%06d",
                ThreadLocalRandom.current().nextInt(1000000)
        );
    }

    /**
     * Finds a verification code by value.
     */
    public Optional<VerificationCode> findByCode(String code) {
        return repo.findByCode(code);
    }

    /**
     * Checks whether a code exists and is not expired.
     */
    public boolean isValidCode(String code) {

        return repo.findByCode(code)
                .filter(vc ->
                        vc.getExpiresAfter()
                                .isAfter(LocalDateTime.now()))
                .isPresent();
    }

    /**
     * Verifies a code and returns the associated user.
     */
    @Transactional
    public User verifyCode(String code) {

        VerificationCode verificationCode =
                repo.findByCode(code)
                        .orElseThrow(() ->
                                new RuntimeException("Invalid verification code"));

        if (verificationCode.getExpiresAfter()
                .isBefore(LocalDateTime.now())) {

            repo.delete(verificationCode);

            throw new RuntimeException("Verification code has expired");
        }

        User user = verificationCode.getUser();

        repo.delete(verificationCode);

        return user;
    }

    /**
     * Deletes a verification code.
     */
    public void deleteCode(String code) {
        repo.findByCode(code)
                .ifPresent(repo::delete);
    }

    /**
     * Deletes a user's current verification code.
     */
    public void deleteByUser(User user) {
        repo.deleteByUser(user);
    }

    /**
     * Generates and saves a new code for a user.
     */
    @Transactional
    public VerificationCode regenerateCode(User user) {
        deleteByUser(user);
        return createVerificationCode(user);
    }
	
}
