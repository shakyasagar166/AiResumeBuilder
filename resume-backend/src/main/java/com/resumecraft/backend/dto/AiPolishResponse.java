package com.resumecraft.backend.dto;

import java.util.List;

public class AiPolishResponse {
    private String originalText;
    private String enhancedText;
    private int atsScoreBoost;
    private List<String> keywordsAdded;

    public AiPolishResponse() {}

    public AiPolishResponse(String originalText, String enhancedText, int atsScoreBoost, List<String> keywordsAdded) {
        this.originalText = originalText;
        this.enhancedText = enhancedText;
        this.atsScoreBoost = atsScoreBoost;
        this.keywordsAdded = keywordsAdded;
    }

    public String getOriginalText() { return originalText; }
    public void setOriginalText(String originalText) { this.originalText = originalText; }

    public String getEnhancedText() { return enhancedText; }
    public void setEnhancedText(String enhancedText) { this.enhancedText = enhancedText; }

    public int getAtsScoreBoost() { return atsScoreBoost; }
    public void setAtsScoreBoost(int atsScoreBoost) { this.atsScoreBoost = atsScoreBoost; }

    public List<String> getKeywordsAdded() { return keywordsAdded; }
    public void setKeywordsAdded(List<String> keywordsAdded) { this.keywordsAdded = keywordsAdded; }
}
