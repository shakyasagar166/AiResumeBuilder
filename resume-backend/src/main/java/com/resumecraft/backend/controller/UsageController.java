package com.resumecraft.backend.controller;

import com.resumecraft.backend.dto.UsageDto;
import com.resumecraft.backend.service.RedisCacheService;
import com.resumecraft.backend.service.UsageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/usage")
public class UsageController {

    private final UsageService usageService;
    private final RedisCacheService redisCacheService;

    public UsageController(UsageService usageService, RedisCacheService redisCacheService) {
        this.usageService = usageService;
        this.redisCacheService = redisCacheService;
    }

    @GetMapping
    public ResponseEntity<UsageDto> getUsage(@RequestParam(required = false, defaultValue = "guest-user") String userIdentifier) {
        UsageDto usage = usageService.getUsage(userIdentifier);
        return ResponseEntity.ok(usage);
    }

    @PostMapping("/decrement")
    public ResponseEntity<UsageDto> decrementFreeDownload(@RequestParam(required = false, defaultValue = "guest-user") String userIdentifier) {
        UsageDto usage = usageService.decrementFreeDownload(userIdentifier);
        return ResponseEntity.ok(usage);
    }

    @PostMapping("/reset-trial")
    public ResponseEntity<UsageDto> resetTrial(@RequestParam(required = false, defaultValue = "guest-user") String userIdentifier) {
        UsageDto usage = usageService.resetTrial(userIdentifier);
        return ResponseEntity.ok(usage);
    }

    @GetMapping("/active-students")
    public ResponseEntity<Map<String, Object>> getActiveStudents() {
        long count = redisCacheService.getActiveStudentsCount();
        return ResponseEntity.ok(Map.of(
                "activeStudents", count,
                "status", "HEALTHY",
                "engine", "Spring Boot + Redis + Apache Kafka",
                "maxCapacity", "50,000 Concurrent Students"
        ));
    }
}
