package com.resumecraft.backend.dto;

public class AiPolishRequest {
    private String text;
    private String targetRole; // e.g., software, student, executive

    public AiPolishRequest() {}

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }
}
