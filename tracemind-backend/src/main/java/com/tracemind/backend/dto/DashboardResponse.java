package com.tracemind.backend.dto;

public class DashboardResponse {

    private Long totalAgents;
    private Long activeAgents;
    private Long totalRuns;
    private Long successfulRuns;
    private Long failedRuns;
    private Double totalCost;
    private Double averageLatency;

    public DashboardResponse() {}

    public Long getTotalAgents() {
        return totalAgents;
    }

    public void setTotalAgents(Long totalAgents) {
        this.totalAgents = totalAgents;
    }

    public Long getActiveAgents() {
        return activeAgents;
    }

    public void setActiveAgents(Long activeAgents) {
        this.activeAgents = activeAgents;
    }

    public Long getTotalRuns() {
        return totalRuns;
    }

    public void setTotalRuns(Long totalRuns) {
        this.totalRuns = totalRuns;
    }

    public Long getSuccessfulRuns() {
        return successfulRuns;
    }

    public void setSuccessfulRuns(Long successfulRuns) {
        this.successfulRuns = successfulRuns;
    }

    public Long getFailedRuns() {
        return failedRuns;
    }

    public void setFailedRuns(Long failedRuns) {
        this.failedRuns = failedRuns;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public Double getAverageLatency() {
        return averageLatency;
    }

    public void setAverageLatency(Double averageLatency) {
        this.averageLatency = averageLatency;
    }

}