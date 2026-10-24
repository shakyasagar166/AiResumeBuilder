package com.resumecraft.backend.controller;

import com.resumecraft.backend.dto.AuthResponse;
import com.resumecraft.backend.dto.LoginRequest;
import com.resumecraft.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Authenticate user with Gmail
     * Restricts access strictly to authorized accounts (shakaysagar166@gmail.com)
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.authenticate(request);
        if (!response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Check if an email is whitelisted
     */
    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> checkEmail(@RequestParam("email") String email) {
        boolean allowed = authService.isEmailAllowed(email);
        return ResponseEntity.ok(Map.of(
                "email", email,
                "isAllowed", allowed,
                "message", allowed ? "Email is authorized." : "Access restricted: only authorized accounts allowed."
        ));
    }

    /**
     * Get list of all currently authorized emails
     */
    @GetMapping("/allowed-emails")
    public ResponseEntity<List<String>> getAllowedEmails() {
        return ResponseEntity.ok(authService.getAllowedEmails());
    }

    /**
     * Add a newly allowed email to MySQL database whitelist
     */
    @PostMapping("/add-email")
    public ResponseEntity<Map<String, Object>> addAllowedEmail(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String addedBy = body.getOrDefault("addedBy", "Admin");
        if (email == null || !email.contains("@")) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Invalid email"));
        }
        boolean ok = authService.addAllowedEmail(email, addedBy);
        return ResponseEntity.ok(Map.of("success", ok, "email", email, "message", "Email added to MySQL whitelist"));
    }
}
