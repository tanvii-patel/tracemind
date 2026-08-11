package com.tracemind.backend.service;

import com.tracemind.backend.dto.RecentRunDTO;
import com.tracemind.backend.entity.Agent;
import com.tracemind.backend.entity.Run;
import com.tracemind.backend.repository.AgentRepository;
import com.tracemind.backend.repository.RunRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RunService {

    private final RunRepository runRepository;
    private final AgentRepository agentRepository;
    private final HistoryService historyService;

    public RunService(
            RunRepository runRepository,
            AgentRepository agentRepository,
            HistoryService historyService
    ) {

        this.runRepository = runRepository;
        this.agentRepository = agentRepository;
        this.historyService = historyService;

    }

    // ================= SAVE =================

    public Run save(Run run) {

        Run saved = runRepository.save(run);

        historyService.save(
                "RUN_CREATED",
                "Prompt executed : " + saved.getPrompt()
        );

        return saved;

    }

    // ================= READ ALL =================

    public List<Run> findAll() {

        return runRepository.findAll();

    }

    // ================= DELETE =================

    public void delete(Long id) {

        Run run = runRepository.findById(id).orElse(null);

        if (run != null) {

            historyService.save(
                    "RUN_DELETED",
                    "Deleted prompt : " + run.getPrompt()
            );

        }

        runRepository.deleteById(id);

    }

    // ================= READ ONE =================

    public Run findById(Long id) {

        return runRepository.findById(id).orElse(null);

    }

    // ================= BY AGENT =================

    public List<Run> findByAgent(Long agentId) {

        return runRepository.findByAgentId(agentId);

    }

    // ================= RECENT RUNS =================

    public List<RecentRunDTO> getRecentRuns() {

        List<Run> runs = runRepository.findTop5ByOrderByIdDesc();

        List<RecentRunDTO> result = new ArrayList<>();

        for (Run run : runs) {

            RecentRunDTO dto = new RecentRunDTO();

            dto.setId(run.getId());
            dto.setStatus(run.getStatus());
            dto.setCost(run.getCost());
            dto.setDuration(run.getDuration());
            dto.setCreatedAt(run.getCreatedAt());

            if (run.getAgentId() != null) {

                Agent agent = agentRepository
                        .findById(run.getAgentId())
                        .orElse(null);

                dto.setAgentName(
                        agent != null
                                ? agent.getName()
                                : "Unknown Agent"
                );

            } else {

                dto.setAgentName("Unknown Agent");

            }

            result.add(dto);

        }

        return result;

    }

}