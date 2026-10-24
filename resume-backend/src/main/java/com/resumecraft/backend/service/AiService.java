package com.resumecraft.backend.service;

import com.resumecraft.backend.dto.AiPolishRequest;
import com.resumecraft.backend.dto.AiPolishResponse;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class AiService {

    private final Random random = new Random();

    private final List<String> techBullets = Arrays.asList(
            "Architected and deployed scalable RESTful microservices using Spring Boot, achieving a 38% reduction in latency for 50,000+ daily active users.",
            "Spearheaded database optimization and indexing in PostgreSQL, reducing query execution time by 45% during peak loads.",
            "Engineered automated CI/CD deployment pipelines utilizing Docker and GitHub Actions, cutting staging release cycle times by 50%.",
            "Collaborated cross-functionally with product and UX designers to build responsive UI components in React, lifting candidate engagement by 32%."
    );

    public AiPolishResponse polishText(AiPolishRequest request) {
        String original = request.getText() != null ? request.getText().trim() : "";
        String enhanced = techBullets.get(random.nextInt(techBullets.size()));
        List<String> keywords = Arrays.asList("Spring Boot", "Latency Reduction", "Scalable Microservices", "CI/CD");

        return new AiPolishResponse(
                original,
                enhanced,
                15, // ATS score boost
                keywords
        );
    }
}
