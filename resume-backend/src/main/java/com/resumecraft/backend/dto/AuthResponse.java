package com.resumecraft.backend.dto;

import java.util.Map;

public class AuthResponse {

    private boolean success;
    private String message;
    private String email;
    private String fullName;
    private String role;
    private boolean isPro;
    private String token;
    private Map<String, Object> details;

    public AuthResponse() {
    }

    public static AuthResponse success(String email, String fullName, String role, boolean isPro, String token, String message) {
        AuthResponse res = new AuthResponse();
        res.setSuccess(true);
        res.setEmail(email);
        res.setFullName(fullName);
        res.setRole(role);
        res.setPro(isPro);
        res.setToken(token);
        res.setMessage(message);
        return res;
    }

    public static AuthResponse failure(String message) {
        AuthResponse res = new AuthResponse();
        res.setSuccess(false);
        res.setMessage(message);
        return res;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isPro() {
        return isPro;
    }

    public void setPro(boolean pro) {
        isPro = pro;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Map<String, Object> getDetails() {
        return details;
    }

    public void setDetails(Map<String, Object> details) {
        this.details = details;
    }
}
