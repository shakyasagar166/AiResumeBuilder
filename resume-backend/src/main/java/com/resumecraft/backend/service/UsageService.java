package com.resumecraft.backend.service;

import com.resumecraft.backend.dto.UsageDto;
import com.resumecraft.backend.events.ResumeEvent;
import com.resumecraft.backend.model.UserUsage;
import com.resumecraft.backend.producer.KafkaEventProducer;
import com.resumecraft.backend.repository.UserUsageRepository;
import org.springframework.stereotype.Service;

@Service
public class UsageService {

    private static final String REDIS_QUOTA_PREFIX = "usage:quota:";

    private final UserUsageRepository userUsageRepository;
    private final RedisCacheService redisCacheService;
    private final KafkaEventProducer kafkaEventProducer;

    public UsageService(UserUsageRepository userUsageRepository,
                        RedisCacheService redisCacheService,
                        KafkaEventProducer kafkaEventProducer) {
        this.userUsageRepository = userUsageRepository;
        this.redisCacheService = redisCacheService;
        this.kafkaEventProducer = kafkaEventProducer;
    }

    public UsageDto getUsage(String userIdentifier) {
        String id = (userIdentifier != null && !userIdentifier.isBlank()) ? userIdentifier : "guest-user";
        UserUsage usage = userUsageRepository.findByUserIdentifier(id)
                .orElseGet(() -> userUsageRepository.save(new UserUsage(id)));
        return toDto(usage);
    }

    /**
     * Decrement free downloads with Redis atomic operations & Kafka event streaming
     */
    public UsageDto decrementFreeDownload(String userIdentifier) {
        String id = (userIdentifier != null && !userIdentifier.isBlank()) ? userIdentifier : "guest-user";
        UserUsage usage = userUsageRepository.findByUserIdentifier(id)
                .orElseGet(() -> new UserUsage(id));

        if (!Boolean.TRUE.equals(usage.getIsPro())) {
            // Atomic decrement via Redis to safely handle 1000+ students concurrently
            Long redisRemaining = redisCacheService.decrementQuota(REDIS_QUOTA_PREFIX + id, usage.getFreeDownloadsRemaining());
            int remaining = Math.max(0, redisRemaining.intValue());
            usage.setFreeDownloadsRemaining(remaining);
        }

        UserUsage saved = userUsageRepository.save(usage);

        // Stream event to Kafka for audit and async PDF processing
        kafkaEventProducer.publishEvent(new ResumeEvent(
                "RESUME_DOWNLOADED",
                id,
                null,
                "Remaining downloads: " + saved.getFreeDownloadsRemaining()
        ));

        return toDto(saved);
    }

    public UsageDto resetTrial(String userIdentifier) {
        String id = (userIdentifier != null && !userIdentifier.isBlank()) ? userIdentifier : "guest-user";
        UserUsage usage = userUsageRepository.findByUserIdentifier(id)
                .orElseGet(() -> new UserUsage(id));

        usage.setFreeDownloadsRemaining(2);
        usage.setIsPro(false);
        usage.setPlanName("FREE");
        usage.setCouponApplied(null);

        redisCacheService.delete(REDIS_QUOTA_PREFIX + id);

        UserUsage saved = userUsageRepository.save(usage);
        return toDto(saved);
    }

    public void upgradeToPro(String userIdentifier, String planName, String coupon) {
        String id = (userIdentifier != null && !userIdentifier.isBlank()) ? userIdentifier : "guest-user";
        UserUsage usage = userUsageRepository.findByUserIdentifier(id)
                .orElseGet(() -> new UserUsage(id));

        usage.setIsPro(true);
        usage.setPlanName(planName != null ? planName : "PRO");
        usage.setCouponApplied(coupon);
        userUsageRepository.save(usage);

        // Publish to Kafka for student enrollment & audit
        kafkaEventProducer.publishEvent(new ResumeEvent(
                "STUDENT_PRO_ACTIVATED",
                id,
                null,
                "Plan: " + planName + " | Coupon: " + coupon
        ));
    }

    private UsageDto toDto(UserUsage u) {
        return new UsageDto(
                u.getUserIdentifier(),
                u.getFreeDownloadsRemaining(),
                Boolean.TRUE.equals(u.getIsPro()),
                u.getPlanName(),
                u.getCouponApplied()
        );
    }
}
