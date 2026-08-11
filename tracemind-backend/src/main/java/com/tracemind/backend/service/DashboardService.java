package com.tracemind.backend.service;

import com.tracemind.backend.dto.DashboardResponse;
import com.tracemind.backend.entity.Agent;
import com.tracemind.backend.entity.Run;
import com.tracemind.backend.repository.AgentRepository;
import com.tracemind.backend.repository.RunRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final AgentRepository agentRepository;
    private final RunRepository runRepository;

    public DashboardService(
            AgentRepository agentRepository,
            RunRepository runRepository
    ) {

        this.agentRepository = agentRepository;
        this.runRepository = runRepository;

    }

    public DashboardResponse getDashboardStats() {

        List<Agent> agents = agentRepository.findAll();
        List<Run> runs = runRepository.findAll();

        DashboardResponse response = new DashboardResponse();

        response.setTotalAgents((long) agents.size());

        response.setActiveAgents(

                agents.stream()

                        .filter(a -> "ACTIVE".equalsIgnoreCase(a.getStatus()))

                        .count()

        );

        response.setTotalRuns((long) runs.size());

        response.setSuccessfulRuns(

                runs.stream()

                        .filter(r -> "SUCCESS".equalsIgnoreCase(r.getStatus()))

                        .count()

        );

        response.setFailedRuns(

                runs.stream()

                        .filter(r -> !"SUCCESS".equalsIgnoreCase(r.getStatus()))

                        .count()

        );

        response.setTotalCost(

                runs.stream()

                        .mapToDouble(r ->

                                r.getCost() == null ? 0 : r.getCost())

                        .sum()

        );

        response.setAverageLatency(

                runs.stream()

                        .mapToInt(r ->

                                r.getDuration() == null ? 0 : r.getDuration())

                        .average()

                        .orElse(0)

        );

        return response;

    }

}