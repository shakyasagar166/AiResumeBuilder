package com.resumecraft.backend.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.*;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.util.backoff.FixedBackOff;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * Enterprise Apache Kafka & Concurrency Configuration
 * Designed to handle 15-50+ concurrent active students without blocking or crashing.
 */
@Configuration
@EnableKafka
@EnableAsync
public class KafkaConfig {

    public static final String RESUME_EVENTS_TOPIC = "resume-events";

    @Value("${spring.kafka.bootstrap-servers:localhost:9092}")
    private String bootstrapServers;

    /**
     * Create partitioned Kafka topic (3 partitions for parallel worker processing)
     */
    @Bean
    public NewTopic resumeEventsTopic() {
        return TopicBuilder.name(RESUME_EVENTS_TOPIC)
                .partitions(3)
                .replicas(1)
                .build();
    }

    /**
     * Dedicated Async Worker Pool to ensure HTTP threads never block under high traffic
     */
    @Bean(name = "kafkaAsyncExecutor")
    public Executor kafkaAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(15);
        executor.setMaxPoolSize(60);
        executor.setQueueCapacity(1000);
        executor.setThreadNamePrefix("kafka-worker-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }

    /**
     * Resilient Producer Factory with batching, short block timeout & fail-safe guarantees
     */
    @Bean
    public ProducerFactory<String, String> producerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.ACKS_CONFIG, "1");
        config.put(ProducerConfig.RETRIES_CONFIG, 3);
        config.put(ProducerConfig.BATCH_SIZE_CONFIG, 16384); // 16 KB batching
        config.put(ProducerConfig.LINGER_MS_CONFIG, 5);      // 5ms linger for concurrent throughput
        config.put(ProducerConfig.BUFFER_MEMORY_CONFIG, 33554432); // 32 MB buffer
        config.put(ProducerConfig.MAX_BLOCK_MS_CONFIG, 1000); // Max 1s wait, never hang HTTP thread
        return new DefaultKafkaProducerFactory<>(config);
    }

    @Bean
    public KafkaTemplate<String, String> kafkaTemplate(ProducerFactory<String, String> producerFactory) {
        return new KafkaTemplate<>(producerFactory);
    }

    /**
     * Multi-threaded Consumer Listener Container Factory with concurrency = 3
     * and graceful error recovery
     */
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory(
            ConsumerFactory<String, String> consumerFactory) {
        ConcurrentKafkaListenerContainerFactory<String, String> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);
        factory.setConcurrency(3); // 3 concurrent consumer threads reading from partitions

        // Graceful error handler with 1-second backoff, up to 2 retries (prevents consumer crash)
        DefaultErrorHandler errorHandler = new DefaultErrorHandler(new FixedBackOff(1000L, 2));
        factory.setCommonErrorHandler(errorHandler);

        return factory;
    }
}
