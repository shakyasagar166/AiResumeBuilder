package com.resumecraft.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_usage")
public class UserUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String userIdentifier; // email or browser id

    private Integer freeDownloadsRemaining = 2;
    private Boolean isPro = false;
    private String planName = "FREE";
    private String couponApplied;
    private LocalDateTime lastUpdated;

    public UserUsage() {}

    public UserUsage(String userIdentifier) {
        this.userIdentifier = userIdentifier;
        this.freeDownloadsRemaining = 2;
        this.isPro = false;
        this.planName = "FREE";
        this.lastUpdated = LocalDateTime.now();
    }

    @PrePersist
    @PreUpdate
    public void onUpdate() {
        this.lastUpdated = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserIdentifier() { return userIdentifier; }
    public void setUserIdentifier(String userIdentifier) { this.userIdentifier = userIdentifier; }

    public Integer getFreeDownloadsRemaining() { return freeDownloadsRemaining; }
    public void setFreeDownloadsRemaining(Integer freeDownloadsRemaining) { this.freeDownloadsRemaining = freeDownloadsRemaining; }

    public Boolean getIsPro() { return isPro; }
    public void setIsPro(Boolean isPro) { this.isPro = isPro; }

    public String getPlanName() { return planName; }
    public void setPlanName(String planName) { this.planName = planName; }

    public String getCouponApplied() { return couponApplied; }
    public void setCouponApplied(String couponApplied) { this.couponApplied = couponApplied; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
}
