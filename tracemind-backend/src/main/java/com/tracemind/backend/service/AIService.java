package com.tracemind.backend.service;

import com.tracemind.backend.entity.Agent;
import com.tracemind.backend.entity.Run;
import com.tracemind.backend.repository.RunRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AIService {

    private final GeminiProvider geminiProvider;
    private final RunRepository runRepository;
    private final HistoryService historyService;
    private final AgentService agentService;

    public AIService(
            GeminiProvider geminiProvider,
            RunRepository runRepository,
            HistoryService historyService,
            AgentService agentService
    ) {
        this.geminiProvider = geminiProvider;
        this.runRepository = runRepository;
        this.historyService = historyService;
        this.agentService = agentService;
    }

    // =====================================================
    // EXECUTE AI
    // =====================================================

    public Run execute(
            String provider,
            String model,
            String prompt,
            Long agentId
    ) {

        System.out.println("========== AI EXECUTION ==========");
        System.out.println("Provider : " + provider);
        System.out.println("Model    : " + model);
        System.out.println("Prompt   : " + prompt);
        System.out.println("Agent ID : " + agentId);
        System.out.println("==================================");

        // =================================================
        // VALIDATION
        // =================================================

        if (provider == null || provider.isBlank()) {
            throw new IllegalArgumentException(
                    "Provider is required"
            );
        }

        if (prompt == null || prompt.isBlank()) {
            throw new IllegalArgumentException(
                    "Prompt is required"
            );
        }

        // =================================================
        // LOAD AGENT
        // =================================================

        Agent agent = null;

        if (agentId != null) {

            agent = agentService.findById(agentId);

            if (agent == null) {
                throw new IllegalArgumentException(
                        "Agent not found with ID: " + agentId
                );
            }

            // ---------------------------------------------
            // CHECK AGENT STATUS
            // ---------------------------------------------

            if ("INACTIVE".equalsIgnoreCase(
                    agent.getStatus()
            )) {

                throw new IllegalArgumentException(
                        "Selected agent is inactive"
                );
            }

            // ---------------------------------------------
            // USE AGENT MODEL
            // ---------------------------------------------

            if (agent.getModel() != null &&
                    !agent.getModel().isBlank()) {

                model = agent.getModel();
            }
        }

        // =================================================
        // DEFAULT MODEL
        // =================================================

        if (model == null || model.isBlank()) {

            model = "gemini-3.5-flash";
        }

        // =================================================
        // CREATE RUN
        // =================================================

        Run run = new Run();

        run.setAgentId(agentId);
        run.setProvider(provider.toUpperCase());
        run.setModel(model);
        run.setPrompt(prompt);
        run.setCreatedAt(LocalDateTime.now());
        run.setStatus("RUNNING");
        run.setCost(0.0);

        long startTime = System.currentTimeMillis();

        try {

            // =================================================
            // EXECUTE PROVIDER
            // =================================================

            String result;

            switch (provider.toUpperCase()) {

                case "GEMINI":

                    result = geminiProvider.generate(
                            model,
                            prompt
                    );

                    break;

                default:

                    throw new IllegalArgumentException(
                            "Unsupported AI provider: " + provider
                    );
            }

            // =================================================
            // CALCULATE DURATION
            // =================================================

            long duration =
                    System.currentTimeMillis() - startTime;

            int durationInt =
                    (int) Math.min(
                            duration,
                            Integer.MAX_VALUE
                    );

            // =================================================
            // SUCCESS
            // =================================================

            run.setResponse(result);
            run.setStatus("SUCCESS");
            run.setDuration(durationInt);

            // Currently Gemini cost is treated as 0
            double cost = 0.0;

            run.setCost(cost);

            // =================================================
            // SAVE RUN
            // =================================================

            Run savedRun = runRepository.save(run);

            // =================================================
            // UPDATE AGENT STATISTICS
            // =================================================

            if (agentId != null) {

                agentService.recordRun(
                        agentId,
                        cost
                );
            }

            // =================================================
            // HISTORY
            // =================================================

            String historyDescription;

            if (agent != null) {

                historyDescription =
                        "AI execution completed using "
                        + model
                        + " by agent "
                        + agent.getName();

            } else {

                historyDescription =
                        "AI execution completed using "
                        + model;
            }

            historyService.save(
                    "AI_EXECUTED",
                    historyDescription
            );

            System.out.println(
                    "AI EXECUTION SUCCESS"
            );

            System.out.println(
                    "Duration : " + durationInt + " ms"
            );

            System.out.println(
                    "Agent ID : " + agentId
            );

            System.out.println(
                    "=================================="
            );

            return savedRun;

        } catch (Exception e) {

            // =================================================
            // FAILED EXECUTION
            // =================================================

            long duration =
                    System.currentTimeMillis() - startTime;

            int durationInt =
                    (int) Math.min(
                            duration,
                            Integer.MAX_VALUE
                    );

            run.setStatus("FAILED");

            run.setResponse(
                    e.getMessage() != null
                            ? e.getMessage()
                            : "AI execution failed"
            );

            run.setDuration(durationInt);

            run.setCost(0.0);

            // =================================================
            // SAVE FAILED RUN
            // =================================================

            runRepository.save(run);

            // =================================================
            // HISTORY
            // =================================================

            historyService.save(
                    "AI_EXECUTION_FAILED",
                    "AI execution failed: "
                            + (e.getMessage() != null
                            ? e.getMessage()
                            : "Unknown error")
            );

            System.out.println(
                    "AI EXECUTION FAILED"
            );

            System.out.println(
                    "Reason : " + e.getMessage()
            );

            System.out.println(
                    "=================================="
            );

            throw e;
        }
    }
}