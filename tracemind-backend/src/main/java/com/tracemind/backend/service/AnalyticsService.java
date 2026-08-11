package com.tracemind.backend.service;

import com.tracemind.backend.dto.AnalyticsDTO;
import com.tracemind.backend.repository.AgentRepository;
import com.tracemind.backend.repository.RunRepository;

import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {

    private final RunRepository runRepository;
    private final AgentRepository agentRepository;

    public AnalyticsService(
            RunRepository runRepository,
            AgentRepository agentRepository) {

        this.runRepository = runRepository;
        this.agentRepository = agentRepository;
    }

    public AnalyticsDTO getAnalytics() {

        AnalyticsDTO dto = new AnalyticsDTO();

        long total = runRepository.count();

        long success = runRepository.countByStatus("SUCCESS");

        long failed = runRepository.countByStatus("FAILED");

        dto.setTotalRuns(total);
        dto.setSuccessRuns(success);
        dto.setFailedRuns(failed);

        if (total == 0)
            dto.setSuccessRate(0);
        else
            dto.setSuccessRate((success * 100.0) / total);

        dto.setAverageCost(
                runRepository.averageCost() == null
                        ? 0
                        : runRepository.averageCost());

        dto.setAverageDuration(
                runRepository.averageDuration() == null
                        ? 0
                        : runRepository.averageDuration());

        dto.setTopAgent("Coming Soon");

        return dto;
    }
}