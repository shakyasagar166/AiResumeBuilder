package com.resumecraft.backend.controller;

import com.resumecraft.backend.dto.AiPolishRequest;
import com.resumecraft.backend.dto.AiPolishResponse;
import com.resumecraft.backend.service.AuthService;
import com.resumecraft.backend.service.GroqAiService;
import com.resumecraft.backend.service.UsageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
public class AiController {

    private final GroqAiService groqAiService;
    private final AuthService authService;
    private final UsageService usageService;

    public AiController(GroqAiService groqAiService, AuthService authService, UsageService usageService) {
        this.groqAiService = groqAiService;
        this.authService = authService;
        this.usageService = usageService;
    }

    @PostMapping("/polish-text")
    public ResponseEntity<AiPolishResponse> polishText(@RequestBody AiPolishRequest request) {
        AiPolishResponse response = groqAiService.polishText(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Auto-Generate Complete Resume from Student's Natural Chat Details
     * Restricted strictly to authorized database users or paid members
     */
    @PostMapping("/chat-generate")
    public ResponseEntity<?> generateResumeFromChat(
            @RequestHeader(value = "X-User-Email", required = false) String headerEmail,
            @RequestHeader(value = "X-User-Identifier", required = false) String headerUserIdentifier,
            @RequestBody Map<String, Object> request) {

        String email = (String) request.getOrDefault("email", headerEmail);
        String userIdentifier = (String) request.getOrDefault("userIdentifier", headerUserIdentifier);

        boolean isDatabaseStudent = email != null && !email.isBlank() && authService.isEmailAllowed(email);
        boolean isPaidPro = false;
        if (userIdentifier != null && !userIdentifier.isBlank()) {
            isPaidPro = usageService.getUsage(userIdentifier).isPro();
        }

        if (!isDatabaseStudent && !isPaidPro) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                    "success", false,
                    "error", "Access Denied: AI Resume Copilot is 100% Free only for Uncodemy students or paid members."
            ));
        }

        String chatText = String.valueOf(request.getOrDefault("chatHistory", 
                request.getOrDefault("userPrompt", 
                request.getOrDefault("prompt", 
                request.getOrDefault("message", 
                request.getOrDefault("text", ""))))));
        Map<String, Object> generatedResume = groqAiService.generateResumeFromChat(chatText);
        return ResponseEntity.ok(generatedResume);
    }
}

