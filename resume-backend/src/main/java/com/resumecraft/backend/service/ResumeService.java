package com.resumecraft.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumecraft.backend.dto.ResumeDto;
import com.resumecraft.backend.events.ResumeEvent;
import com.resumecraft.backend.model.ResumeEntity;
import com.resumecraft.backend.producer.KafkaEventProducer;
import com.resumecraft.backend.repository.ResumeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@Service
public class ResumeService {

    private static final Logger log = LoggerFactory.getLogger(ResumeService.class);
    private static final String REDIS_PREFIX = "resume:user:";

    private final ResumeRepository resumeRepository;
    private final ObjectMapper objectMapper;
    private final RedisCacheService redisCacheService;
    private final KafkaEventProducer kafkaEventProducer;

    public ResumeService(ResumeRepository resumeRepository,
                         ObjectMapper objectMapper,
                         RedisCacheService redisCacheService,
                         KafkaEventProducer kafkaEventProducer) {
        this.resumeRepository = resumeRepository;
        this.objectMapper = objectMapper;
        this.redisCacheService = redisCacheService;
        this.kafkaEventProducer = kafkaEventProducer;
    }

    public ResumeDto saveResume(ResumeDto dto) {
        try {
            ResumeEntity entity;
            String userEmail = dto.getUserEmail() != null ? dto.getUserEmail() : "guest@resumecraft.com";

            Optional<ResumeEntity> existing = resumeRepository.findFirstByUserEmailOrderByUpdatedAtDesc(userEmail);
            if (existing.isPresent()) {
                entity = existing.get();
            } else {
                entity = new ResumeEntity();
                entity.setUserEmail(userEmail);
            }

            entity.setFullName(dto.getFullName());
            entity.setJobTitle(dto.getJobTitle());
            entity.setTemplateId(dto.getTemplateId());
            entity.setAccentColor(dto.getAccentColor());
            entity.setFontStyle(dto.getFontStyle());
            entity.setAtsScore(dto.getAtsScore() != null ? dto.getAtsScore() : 85);

            if (dto.getContent() != null) {
                String json = dto.getContent() instanceof String 
                        ? (String) dto.getContent() 
                        : objectMapper.writeValueAsString(dto.getContent());
                entity.setContentJson(json);
            }

            ResumeEntity saved = resumeRepository.save(entity);
            dto.setId(saved.getId());

            // 1. High-speed Redis caching (1,000+ students scale)
            String cacheKey = REDIS_PREFIX + userEmail;
            redisCacheService.set(cacheKey, objectMapper.writeValueAsString(dto), Duration.ofHours(2));

            // 2. Publish asynchronous Kafka streaming event
            kafkaEventProducer.publishEvent(new ResumeEvent(
                    "RESUME_SAVED",
                    userEmail,
                    saved.getId(),
                    "ATS Score: " + entity.getAtsScore()
            ));

            return dto;
        } catch (Exception e) {
            log.error("Failed to save resume", e);
            throw new RuntimeException("Failed to save resume: " + e.getMessage(), e);
        }
    }

    public Optional<ResumeDto> getLatestResume(String userEmail) {
        String email = userEmail != null ? userEmail : "guest@resumecraft.com";
        String cacheKey = REDIS_PREFIX + email;

        // Try Redis cache first (sub-millisecond retrieval)
        String cachedJson = redisCacheService.get(cacheKey);
        if (cachedJson != null && !cachedJson.isBlank()) {
            try {
                ResumeDto cachedDto = objectMapper.readValue(cachedJson, ResumeDto.class);
                log.info("⚡ [Redis Cache HIT] Resume fetched in <1ms for: {}", email);
                return Optional.of(cachedDto);
            } catch (Exception e) {
                log.warn("Redis deserialization fallback to DB: {}", e.getMessage());
            }
        }

        // Cache miss: retrieve from JPA repository
        Optional<ResumeDto> fromDb = resumeRepository.findFirstByUserEmailOrderByUpdatedAtDesc(email)
                .map(this::toDto);

        // Populate Redis cache for next requests
        fromDb.ifPresent(dto -> {
            try {
                redisCacheService.set(cacheKey, objectMapper.writeValueAsString(dto), Duration.ofHours(2));
            } catch (Exception ignored) {}
        });

        return fromDb;
    }

    public List<ResumeEntity> getAllResumes(String userEmail) {
        String email = userEmail != null ? userEmail : "guest@resumecraft.com";
        return resumeRepository.findByUserEmailOrderByUpdatedAtDesc(email);
    }

    private ResumeDto toDto(ResumeEntity entity) {
        ResumeDto dto = new ResumeDto();
        dto.setId(entity.getId());
        dto.setUserEmail(entity.getUserEmail());
        dto.setFullName(entity.getFullName());
        dto.setJobTitle(entity.getJobTitle());
        dto.setTemplateId(entity.getTemplateId());
        dto.setAccentColor(entity.getAccentColor());
        dto.setFontStyle(entity.getFontStyle());
        dto.setAtsScore(entity.getAtsScore());

        try {
            if (entity.getContentJson() != null) {
                dto.setContent(objectMapper.readValue(entity.getContentJson(), Object.class));
            }
        } catch (Exception e) {
            dto.setContent(entity.getContentJson());
        }
        return dto;
    }
}
