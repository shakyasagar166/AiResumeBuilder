package com.resumecraft.backend.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumecraft.backend.config.KafkaConfig;
import com.resumecraft.backend.events.ResumeEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicLong;

/**
 * Enterprise Multi-Threaded Kafka Consumer
 * Runs 3 concurrent partition workers to consume events in parallel without lagging.
 */
@Service
public class KafkaEventConsumer {

    private static final Logger log = LoggerFactory.getLogger(KafkaEventConsumer.class);

    private final ObjectMapper objectMapper;
    private final AtomicLong processedEvents = new AtomicLong(0);

    public KafkaEventConsumer(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @KafkaListener(
            topics = KafkaConfig.RESUME_EVENTS_TOPIC,
            groupId = "resumecraft-group",
            containerFactory = "kafkaListenerContainerFactory",
            autoStartup = "${resumecraft.kafka.consumer.enabled:true}"
    )
    public void consumeResumeEvent(String message) {
        try {
            ResumeEvent event = objectMapper.readValue(message, ResumeEvent.class);
            long count = processedEvents.incrementAndGet();

            log.info("📥 [Kafka Consumer Worker | Event #{}] Type: {} | User: {} | TS: {}",
                    count,
                    event.getEventType(),
                    event.getUserIdentifier(),
                    event.getTimestamp());

            // Decoupled asynchronous background processing
            switch (event.getEventType()) {
                case "USER_LOGIN" -> {
                    log.info("👤 [Audit Trail] User logged in: {}", event.getUserIdentifier());
                }
                case "RESUME_SAVED" -> {
                    log.info("💾 [Audit Trail] Resume saved for user: {} (Resume ID: {})",
                            event.getUserIdentifier(), event.getResumeId());
                }
                case "AI_POLISH", "AI_CHAT_GENERATE" -> {
                    log.info("🤖 [AI Metric] AI processing recorded for user: {} | Meta: {}",
                            event.getUserIdentifier(), event.getMetadata());
                }
                case "RESUME_EXPORT", "RESUME_DOWNLOAD" -> {
                    log.info("📄 [Export Metric] Resume export triggered by: {}", event.getUserIdentifier());
                }
                case "EMAIL_SENT" -> {
                    log.info("📧 [Email Metric] Resume email sent to: {}", event.getUserIdentifier());
                }
                default -> {
                    log.debug("ℹ️ [Kafka Event] Handled general event: {}", event.getEventType());
                }
            }
        } catch (Exception e) {
            log.error("❌ Failed to process Kafka message: {}", e.getMessage());
        }
    }

    public long getProcessedEventsCount() {
        return processedEvents.get();
    }
}
