package com.resumecraft.backend.events;

public class ResumeEvent {

    private String eventType;
    private String userIdentifier;
    private Long resumeId;
    private long timestamp;
    private String metadata;

    public ResumeEvent() {}

    public ResumeEvent(String eventType, String userIdentifier, Long resumeId, String metadata) {
        this.eventType = eventType;
        this.userIdentifier = userIdentifier;
        this.resumeId = resumeId;
        this.timestamp = System.currentTimeMillis();
        this.metadata = metadata;
    }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public String getUserIdentifier() { return userIdentifier; }
    public void setUserIdentifier(String userIdentifier) { this.userIdentifier = userIdentifier; }

    public Long getResumeId() { return resumeId; }
    public void setResumeId(Long resumeId) { this.resumeId = resumeId; }

    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }

    public String getMetadata() { return metadata; }
    public void setMetadata(String metadata) { this.metadata = metadata; }

    @Override
    public String toString() {
        return "ResumeEvent{" +
                "eventType='" + eventType + '\'' +
                ", userIdentifier='" + userIdentifier + '\'' +
                ", resumeId=" + resumeId +
                ", timestamp=" + timestamp +
                ", metadata='" + metadata + '\'' +
                '}';
    }
}
