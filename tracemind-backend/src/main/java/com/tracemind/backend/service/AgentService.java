package com.tracemind.backend.service;

import com.tracemind.backend.entity.Agent;
import com.tracemind.backend.repository.AgentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentService {

    private final AgentRepository repository;
    private final HistoryService historyService;

    public AgentService(
            AgentRepository repository,
            HistoryService historyService
    ) {
        this.repository = repository;
        this.historyService = historyService;
    }

    // ================= CREATE =================

    public Agent save(Agent agent) {

        if (agent.getStatus() == null || agent.getStatus().isBlank()) {
            agent.setStatus("ACTIVE");
        }

        if (agent.getTotalRuns() == null) {
            agent.setTotalRuns(0);
        }

        if (agent.getTotalCost() == null) {
            agent.setTotalCost(0.0);
        }

        Agent saved = repository.save(agent);

        historyService.save(
                "AGENT_CREATED",
                saved.getName() + " agent was created"
        );

        return saved;
    }

    // ================= READ ALL =================

    public List<Agent> findAll() {

        return repository.findAll();
    }

    // ================= READ ONE =================

    public Agent findById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Agent not found: " + id)
                );
    }

    // ================= UPDATE =================

    public Agent update(Long id, Agent updatedAgent) {

        Agent agent = repository.findById(id).orElse(null);

        if (agent == null) {
            return null;
        }

        agent.setName(updatedAgent.getName());
        agent.setDescription(updatedAgent.getDescription());
        agent.setModel(updatedAgent.getModel());
        agent.setStatus(updatedAgent.getStatus());

        Agent updated = repository.save(agent);

        historyService.save(
                "AGENT_UPDATED",
                updated.getName() + " agent was updated"
        );

        return updated;
    }

    // ================= RECORD AI RUN =================

    public Agent recordRun(Long agentId, double cost) {

        Agent agent = repository.findById(agentId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Agent not found: " + agentId
                        )
                );

        Integer currentRuns = agent.getTotalRuns();

        if (currentRuns == null) {
            currentRuns = 0;
        }

        Double currentCost = agent.getTotalCost();

        if (currentCost == null) {
            currentCost = 0.0;
        }

        agent.setTotalRuns(currentRuns + 1);
        agent.setTotalCost(currentCost + cost);

        return repository.save(agent);
    }

    // ================= DELETE =================

    public void delete(Long id) {

        Agent agent = repository.findById(id).orElse(null);

        if (agent != null) {

            historyService.save(
                    "AGENT_DELETED",
                    agent.getName() + " agent was deleted"
            );
        }

        repository.deleteById(id);
    }
}