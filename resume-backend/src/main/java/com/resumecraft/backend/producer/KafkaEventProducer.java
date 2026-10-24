package com.resumecraft.backend.producer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumecraft.backend.config.KafkaConfig;
import com.resumecraft.backend.events.ResumeEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Executor;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Enterprise Non-Blocking Kafka Event Producer
 * Features:
 * - Asynchronous execution on dedicated worker thread pool
 * - Zero HTTP thread blocking (sub-millisecond latency for caller)
 * - In-memory fail-safe queue so website NEVER crashes even if Kafka is slow/offline
 * - Automatic background retry and flush when broker reconnects
 */
@Service
public class KafkaEventProducer {

    private static final Logger log = LoggerFactory.getLogger(KafkaEventProducer.class);
    private static final int MAX_FALLBACK_QUEUE_SIZE = 2000;

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private final Executor asyncExecutor;

    // In-memory resilient queue to safeguard events when broker is offline
    private final ConcurrentLinkedQueue<ResumeEvent> fallbackQueue = new ConcurrentLinkedQueue<>();
    private final AtomicLong deliveredCount = new AtomicLong(0);

    @Autowired
    public KafkaEventProducer(
            @Autowired(required = false) KafkaTemplate<String, String> kafkaTemplate,
            ObjectMapper objectMapper,
            @Qualifier("kafkaAsyncExecutor") Executor asyncExecutor) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
        this.asyncExecutor = asyncExecutor;
    }

    /**
     * Publishes event asynchronously. Returns immediately (< 1ms) so users never experience lag.
     */
    public void publishEvent(ResumeEvent event) {
        if (event == null) return;

        asyncExecutor.execute(() -> {
            try {
                if (kafkaTemplate != null) {
                    String json = objectMapper.writeValueAsString(event);
                    String partitionKey = event.getUserIdentifier() != null
                            ? event.getUserIdentifier()
                            : "global-user";

                    kafkaTemplate.send(KafkaConfig.RESUME_EVENTS_TOPIC, partitionKey, json)
                            .whenComplete((result, ex) -> {
                                if (ex == null) {
                                    long total = deliveredCount.incrementAndGet();
                                    log.info("🚀 [Kafka Produced #{} | Partition {}] Event: {} | User: {}",
                                            total,
                                            result.getRecordMetadata().partition(),
                                            event.getEventType(),
                                            event.getUserIdentifier());
                                } else {
                                    enqueueFallback(event, ex.getMessage());
                                }
                            });
                } else {
                    enqueueFallback(event, "KafkaTemplate not available");
                }
            } catch (Exception e) {
                enqueueFallback(event, e.getMessage());
            }
        });
    }

    private void enqueueFallback(ResumeEvent event, String reason) {
        if (fallbackQueue.size() < MAX_FALLBACK_QUEUE_SIZE) {
            fallbackQueue.offer(event);
            log.warn("⚠️ [Kafka Broker Offline / Busy] Event buffered safely in memory (Buffered count: {}). Reason: {}",
                    fallbackQueue.size(), reason);
        } else {
            log.error("🚨 Fallback queue full (max {}), dropping oldest event", MAX_FALLBACK_QUEUE_SIZE);
            fallbackQueue.poll();
            fallbackQueue.offer(event);
        }
    }

    /**
     * Periodically retries sending buffered events once Kafka broker becomes available
     */
    @Scheduled(fixedDelay = 15000)
    public void flushBufferedEvents() {
        if (fallbackQueue.isEmpty() || kafkaTemplate == null) return;

        int toFlush = Math.min(fallbackQueue.size(), 50);
        log.info("🔄 [Kafka Reconnect Flush] Attempting to deliver {} buffered events...", toFlush);

        for (int i = 0; i < toFlush; i++) {
            ResumeEvent event = fallbackQueue.poll();
            if (event == null) break;

            try {
                String json = objectMapper.writeValueAsString(event);
                String partitionKey = event.getUserIdentifier() != null ? event.getUserIdentifier() : "global";
                kafkaTemplate.send(KafkaConfig.RESUME_EVENTS_TOPIC, partitionKey, json)
                        .whenComplete((res, ex) -> {
                            if (ex == null) {
                                deliveredCount.incrementAndGet();
                            } else {
                                fallbackQueue.offer(event);
                            }
                        });
            } catch (Exception e) {
                fallbackQueue.offer(event);
                break;
            }
        }
    }

    public long getDeliveredCount() {
        return deliveredCount.get();
    }

    public int getBufferedCount() {
        return fallbackQueue.size();
    }
}
