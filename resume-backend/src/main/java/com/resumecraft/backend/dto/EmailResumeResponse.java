package com.resumecraft.backend.dto;

public class EmailResumeResponse {

    private boolean success;
    private String message;
    private String recipientEmail;
    private String deliveryStatus;
    private String trackingId;
    private boolean realSmtpUsed;

    public EmailResumeResponse() {}

    public EmailResumeResponse(boolean success, String message, String recipientEmail, String deliveryStatus, String trackingId, boolean realSmtpUsed) {
        this.success = success;
        this.message = message;
        this.recipientEmail = recipientEmail;
        this.deliveryStatus = deliveryStatus;
        this.trackingId = trackingId;
        this.realSmtpUsed = realSmtpUsed;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public String getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(String deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }

    public boolean isRealSmtpUsed() {
        return realSmtpUsed;
    }

    public void setRealSmtpUsed(boolean realSmtpUsed) {
        this.realSmtpUsed = realSmtpUsed;
    }
}
