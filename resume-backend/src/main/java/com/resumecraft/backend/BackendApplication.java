package com.resumecraft.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync
@EnableScheduling
@EnableJpaRepositories(basePackages = "com.resumecraft.backend.repository")
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
        System.out.println("=================================================");
        System.out.println("🚀 ResumeCraft Pro Spring Boot Backend Running!");
        System.out.println("📡 API Base URL: http://localhost:8080/api/v1");
        System.out.println("💾 Database: MySQL (Enterprise Relational DB)");
        System.out.println("=================================================");
    }
}
