package com.resumecraft.backend.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "allowed_emails")
public class AllowedEmailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 150)
    private String email;

    private String addedBy;
    private String notes;
    private boolean isActive;
    private Instant createdAt;

    public AllowedEmailEntity() {
        this.createdAt = Instant.now();
        this.isActive = true;
    }

    public AllowedEmailEntity(String email, String addedBy, String notes) {
        this();
        this.email = email;
        this.addedBy = addedBy;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(String addedBy) {
        this.addedBy = addedBy;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
