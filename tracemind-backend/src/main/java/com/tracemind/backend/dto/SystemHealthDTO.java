package com.tracemind.backend.dto;

public class SystemHealthDTO {

    private double cpuUsage;
    private double memoryUsage;
    private double diskUsage;

    private long runningAgents;
    private long activeWorkflows;
    private long failedRuns;

    public double getCpuUsage() {
        return cpuUsage;
    }

    public void setCpuUsage(double cpuUsage) {
        this.cpuUsage = cpuUsage;
    }

    public double getMemoryUsage() {
        return memoryUsage;
    }

    public void setMemoryUsage(double memoryUsage) {
        this.memoryUsage = memoryUsage;
    }

    public double getDiskUsage() {
        return diskUsage;
    }

    public void setDiskUsage(double diskUsage) {
        this.diskUsage = diskUsage;
    }

    public long getRunningAgents() {
        return runningAgents;
    }

    public void setRunningAgents(long runningAgents) {
        this.runningAgents = runningAgents;
    }

    public long getActiveWorkflows() {
        return activeWorkflows;
    }

    public void setActiveWorkflows(long activeWorkflows) {
        this.activeWorkflows = activeWorkflows;
    }

    public long getFailedRuns() {
        return failedRuns;
    }

    public void setFailedRuns(long failedRuns) {
        this.failedRuns = failedRuns;
    }

}