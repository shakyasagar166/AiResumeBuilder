package com.resumecraft.backend.dto;

public class CouponDto {
    private String code;
    private boolean valid;
    private int discountPercent;
    private String description;

    public CouponDto() {}

    public CouponDto(String code, boolean valid, int discountPercent, String description) {
        this.code = code;
        this.valid = valid;
        this.discountPercent = discountPercent;
        this.description = description;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public boolean isValid() { return valid; }
    public void setValid(boolean valid) { this.valid = valid; }

    public int getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(int discountPercent) { this.discountPercent = discountPercent; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
