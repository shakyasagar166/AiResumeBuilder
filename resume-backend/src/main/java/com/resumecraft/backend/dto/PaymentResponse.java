package com.resumecraft.backend.dto;

public class PaymentResponse {
    private boolean success;
    private String orderId;
    private String plan;
    private Double amount;
    private String message;

    public PaymentResponse() {}

    public PaymentResponse(boolean success, String orderId, String plan, Double amount, String message) {
        this.success = success;
        this.orderId = orderId;
        this.plan = plan;
        this.amount = amount;
        this.message = message;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getPlan() { return plan; }
    public void setPlan(String plan) { this.plan = plan; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
