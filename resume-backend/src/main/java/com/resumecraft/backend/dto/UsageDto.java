package com.resumecraft.backend.dto;

public class UsageDto {
    private String userIdentifier;
    private int freeDownloadsRemaining;
    private boolean isPro;
    private String planName;
    private String couponApplied;

    public UsageDto() {}

    public UsageDto(String userIdentifier, int freeDownloadsRemaining, boolean isPro, String planName, String couponApplied) {
        this.userIdentifier = userIdentifier;
        this.freeDownloadsRemaining = freeDownloadsRemaining;
        this.isPro = isPro;
        this.planName = planName;
        this.couponApplied = couponApplied;
    }

    public String getUserIdentifier() { return userIdentifier; }
    public void setUserIdentifier(String userIdentifier) { this.userIdentifier = userIdentifier; }

    public int getFreeDownloadsRemaining() { return freeDownloadsRemaining; }
    public void setFreeDownloadsRemaining(int freeDownloadsRemaining) { this.freeDownloadsRemaining = freeDownloadsRemaining; }

    public boolean isPro() { return isPro; }
    public void setPro(boolean pro) { isPro = pro; }

    public String getPlanName() { return planName; }
    public void setPlanName(String planName) { this.planName = planName; }

    public String getCouponApplied() { return couponApplied; }
    public void setCouponApplied(String couponApplied) { this.couponApplied = couponApplied; }
}
