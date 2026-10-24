package com.resumecraft.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "Email is required")
    private String email;

    private String fullName;
    private String authProvider; // "GMAIL", "GOOGLE_OAUTH", "DIRECT"
    private String passwordOrOtp;

    public LoginRequest() {
    }

    public LoginRequest(String email, String fullName, String authProvider) {
        this.email = email;
        this.fullName = fullName;
        this.authProvider = authProvider;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAuthProvider() {
        return authProvider;
    }

    public void setAuthProvider(String authProvider) {
        this.authProvider = authProvider;
    }

    public String getPasswordOrOtp() {
        return passwordOrOtp;
    }

    public void setPasswordOrOtp(String passwordOrOtp) {
        this.passwordOrOtp = passwordOrOtp;
    }
}
