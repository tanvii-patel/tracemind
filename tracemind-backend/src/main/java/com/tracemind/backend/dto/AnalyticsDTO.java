package com.tracemind.backend.dto;

public class AnalyticsDTO {

    private long totalRuns;
    private long successRuns;
    private long failedRuns;

    private double successRate;

    private double averageCost;
    private double averageDuration;

    private String topAgent;

    public long getTotalRuns() {
        return totalRuns;
    }

    public void setTotalRuns(long totalRuns) {
        this.totalRuns = totalRuns;
    }

    public long getSuccessRuns() {
        return successRuns;
    }

    public void setSuccessRuns(long successRuns) {
        this.successRuns = successRuns;
    }

    public long getFailedRuns() {
        return failedRuns;
    }

    public void setFailedRuns(long failedRuns) {
        this.failedRuns = failedRuns;
    }

    public double getSuccessRate() {
        return successRate;
    }

    public void setSuccessRate(double successRate) {
        this.successRate = successRate;
    }

    public double getAverageCost() {
        return averageCost;
    }

    public void setAverageCost(double averageCost) {
        this.averageCost = averageCost;
    }

    public double getAverageDuration() {
        return averageDuration;
    }

    public void setAverageDuration(double averageDuration) {
        this.averageDuration = averageDuration;
    }

    public String getTopAgent() {
        return topAgent;
    }

    public void setTopAgent(String topAgent) {
        this.topAgent = topAgent;
    }
}