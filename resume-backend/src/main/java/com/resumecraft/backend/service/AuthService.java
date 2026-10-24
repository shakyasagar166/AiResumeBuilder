package com.resumecraft.backend.service;

import com.resumecraft.backend.dto.AuthResponse;
import com.resumecraft.backend.dto.LoginRequest;
import com.resumecraft.backend.model.AllowedEmailEntity;
import com.resumecraft.backend.model.UserEntity;
import com.resumecraft.backend.repository.AllowedEmailRepository;
import com.resumecraft.backend.repository.UserRepository;
import com.resumecraft.backend.events.ResumeEvent;
import com.resumecraft.backend.producer.KafkaEventProducer;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class AuthService {

    private static final String PRIMARY_AUTHORIZED_EMAIL = "shakaysagar166@gmail.com";

    // In-memory fallback set in case MySQL is temporarily starting or offline
    private final Set<String> inMemoryAllowedEmails = new HashSet<>(Collections.singletonList(PRIMARY_AUTHORIZED_EMAIL.toLowerCase()));

    @Autowired(required = false)
    private UserRepository userRepository;

    @Autowired(required = false)
    private AllowedEmailRepository allowedEmailRepository;

    @Autowired(required = false)
    private KafkaEventProducer kafkaEventProducer;

    @PostConstruct
    public void initAllowedAccounts() {
        try {
            if (allowedEmailRepository != null) {
                if (!allowedEmailRepository.existsByEmailIgnoreCase(PRIMARY_AUTHORIZED_EMAIL)) {
                    AllowedEmailEntity primaryAdmin = new AllowedEmailEntity(
                            PRIMARY_AUTHORIZED_EMAIL.toLowerCase(),
                            "SYSTEM",
                            "Primary Administrator & Authorized Student Lead"
                    );
                    allowedEmailRepository.save(primaryAdmin);
                    System.out.println("💾 [MySQL] Seeded primary authorized email: " + PRIMARY_AUTHORIZED_EMAIL);
                }

                // Also ensure UserEntity exists in MySQL
                if (userRepository != null && !userRepository.existsByEmailIgnoreCase(PRIMARY_AUTHORIZED_EMAIL)) {
                    UserEntity adminUser = new UserEntity(
                            PRIMARY_AUTHORIZED_EMAIL.toLowerCase(),
                            "Sagar Shakya",
                            "SUPER_ADMIN",
                            "GMAIL"
                    );
                    adminUser.setPro(true);
                    userRepository.save(adminUser);
                    System.out.println("💾 [MySQL] Seeded UserEntity for: " + PRIMARY_AUTHORIZED_EMAIL);
                }
            }
        } catch (Exception e) {
            System.err.println("⚠️ [MySQL Init Warning] Could not initialize database tables: " + e.getMessage());
            // Fallback continues in-memory
        }
    }

    public boolean isEmailAllowed(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        String cleanEmail = email.trim().toLowerCase();

        // 1. Check primary authorized admin email directly
        if (PRIMARY_AUTHORIZED_EMAIL.equalsIgnoreCase(cleanEmail)) {
            return true;
        }

        // 2. Check in-memory list
        if (inMemoryAllowedEmails.contains(cleanEmail)) {
            return true;
        }

        // 3. Check MySQL allowed_emails table
        try {
            if (allowedEmailRepository != null) {
                boolean allowed = allowedEmailRepository.findByEmailIgnoreCase(cleanEmail)
                        .map(AllowedEmailEntity::isActive)
                        .orElse(false);
                if (allowed) {
                    return true;
                }
            }
        } catch (Exception e) {
            System.err.println("⚠️ [MySQL Lookup Error in allowed_emails]: " + e.getMessage());
        }

        // 4. Check MySQL users table
        try {
            if (userRepository != null && userRepository.existsByEmailIgnoreCase(cleanEmail)) {
                return true;
            }
        } catch (Exception e) {
            System.err.println("⚠️ [MySQL Lookup Error in users]: " + e.getMessage());
        }

        return false;
    }

    public AuthResponse authenticate(LoginRequest req) {
        if (req == null || req.getEmail() == null || req.getEmail().trim().isEmpty()) {
            return AuthResponse.failure("Please enter your registered email address.");
        }

        String email = req.getEmail().trim().toLowerCase();

        if (!isEmailAllowed(email)) {
            return AuthResponse.failure("Access Denied");
        }

        // Retrieve existing name from MySQL if available
        String name = (req.getFullName() != null && !req.getFullName().trim().isEmpty())
                ? req.getFullName().trim()
                : null;

        if (name == null && userRepository != null) {
            try {
                Optional<UserEntity> existing = userRepository.findByEmailIgnoreCase(email);
                if (existing.isPresent() && existing.get().getFullName() != null && !existing.get().getFullName().trim().isEmpty()) {
                    name = existing.get().getFullName();
                }
            } catch (Exception ignored) {}
        }

        if (name == null || name.trim().isEmpty()) {
            name = email.equalsIgnoreCase(PRIMARY_AUTHORIZED_EMAIL) ? "Sagar Shakya" : email.split("@")[0];
        }

        String role = email.equalsIgnoreCase(PRIMARY_AUTHORIZED_EMAIL) ? "SUPER_ADMIN" : "STUDENT_PRO";
        String token = "uncodemy_" + UUID.randomUUID().toString().replace("-", "");

        // Persist/Update to MySQL if available
        try {
            if (userRepository != null) {
                UserEntity user = userRepository.findByEmailIgnoreCase(email)
                        .orElse(new UserEntity(email, name, role, req.getAuthProvider() != null ? req.getAuthProvider() : "EMAIL_PASSWORDLESS"));

                user.setLastLoginAt(Instant.now());
                user.setFullName(name);
                user.setPro(true);
                userRepository.save(user);
                System.out.println("✅ [MySQL] Login recorded successfully for: " + email);
            }
        } catch (Exception e) {
            System.err.println("⚠️ [MySQL User Save Warning]: " + e.getMessage());
        }

        // Asynchronously stream login event via Kafka for real-time audit & concurrent activity tracking
        if (kafkaEventProducer != null) {
            kafkaEventProducer.publishEvent(new ResumeEvent(
                    "USER_LOGIN",
                    email,
                    null,
                    "Name: " + name + " | Role: " + role
            ));
        }

        return AuthResponse.success(
                email,
                name,
                role,
                true,
                token,
                "Login successful! Welcome to AI Resume Portal, " + name
        );
    }

    public List<String> getAllowedEmails() {
        Set<String> all = new HashSet<>(inMemoryAllowedEmails);
        try {
            if (allowedEmailRepository != null) {
                List<AllowedEmailEntity> list = allowedEmailRepository.findByIsActiveTrue();
                for (AllowedEmailEntity doc : list) {
                    all.add(doc.getEmail().toLowerCase());
                }
            }
        } catch (Exception ignored) {}
        return new ArrayList<>(all);
    }

    public boolean addAllowedEmail(String newEmail, String addedBy) {
        if (newEmail == null || !newEmail.contains("@")) return false;
        String clean = newEmail.trim().toLowerCase();
        inMemoryAllowedEmails.add(clean);

        try {
            if (allowedEmailRepository != null) {
                Optional<AllowedEmailEntity> existing = allowedEmailRepository.findByEmailIgnoreCase(clean);
                if (existing.isPresent()) {
                    AllowedEmailEntity doc = existing.get();
                    doc.setActive(true);
                    allowedEmailRepository.save(doc);
                } else {
                    AllowedEmailEntity doc = new AllowedEmailEntity(clean, addedBy, "Added by admin");
                    allowedEmailRepository.save(doc);
                }
                return true;
            }
        } catch (Exception e) {
            System.err.println("⚠️ [MySQL Add Warning]: " + e.getMessage());
        }
        return true;
    }
}
