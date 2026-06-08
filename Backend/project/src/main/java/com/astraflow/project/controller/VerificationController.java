package com.astraflow.project.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.astraflow.project.model.User;
import com.astraflow.project.model.VerificationCode;
import com.astraflow.project.service.EmailService;
import com.astraflow.project.service.UserService;
import com.astraflow.project.service.VerificationCodeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class VerificationController {

	@Autowired
    private VerificationCodeService verificationCodeService;
	
	@Autowired
    private UserService userService;
	
	@Autowired
    private EmailService emailService;

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody Map<String, String> body) {
        String code = body.get("code");
        try {
            User user = verificationCodeService.verifyCode(code);
            user.setEmailVerified(true);
            userService.save(user);
            return ResponseEntity.ok("Email verified successfully");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<?> resendVerificationCode(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        User user = userService.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (user.isEmailVerified()) {
            return ResponseEntity.badRequest()
                    .body("Email already verified");
        }

        VerificationCode verificationCode =
                verificationCodeService.regenerateCode(user);

        emailService.sendVerificationEmail(
                user.getEmail(),
                verificationCode.getCode()
        );

        return ResponseEntity.status(HttpStatus.OK)
                .body("Verification code sent");
    }
}