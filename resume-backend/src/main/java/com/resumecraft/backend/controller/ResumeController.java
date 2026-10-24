package com.resumecraft.backend.controller;

import com.resumecraft.backend.dto.EmailResumeRequest;
import com.resumecraft.backend.dto.EmailResumeResponse;
import com.resumecraft.backend.dto.ResumeDto;
import com.resumecraft.backend.model.ResumeEntity;
import com.resumecraft.backend.service.EmailService;
import com.resumecraft.backend.service.ResumeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/resumes")
public class ResumeController {

    private final ResumeService resumeService;
    private final EmailService emailService;

    public ResumeController(ResumeService resumeService, EmailService emailService) {
        this.resumeService = resumeService;
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<ResumeDto> saveResume(@RequestBody ResumeDto resumeDto) {
        ResumeDto saved = resumeService.saveResume(resumeDto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/current")
    public ResponseEntity<ResumeDto> getCurrentResume(@RequestParam(required = false) String email) {
        return resumeService.getLatestResume(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @GetMapping
    public ResponseEntity<List<ResumeEntity>> getAllResumes(@RequestParam(required = false) String email) {
        List<ResumeEntity> list = resumeService.getAllResumes(email);
        return ResponseEntity.ok(list);
    }

    /**
     * Direct Resume Email Delivery to Student's Mailbox
     */
    @PostMapping("/email")
    public ResponseEntity<EmailResumeResponse> emailResume(@Valid @RequestBody EmailResumeRequest request) {
        EmailResumeResponse response = emailService.sendResumeEmail(request);
        return ResponseEntity.ok(response);
    }
}
