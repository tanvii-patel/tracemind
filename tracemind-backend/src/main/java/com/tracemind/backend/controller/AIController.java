package com.tracemind.backend.controller;

import com.tracemind.backend.entity.Run;
import com.tracemind.backend.service.AIService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    // =========================
    // TEST AI EXECUTION
    // =========================

    @PostMapping("/execute")
    public Run executeAI(@RequestBody AIRequest request) {

        System.out.println("========== AI EXECUTION ==========");
        System.out.println("Provider : " + request.getProvider());
        System.out.println("Model    : " + request.getModel());
        System.out.println("Prompt   : " + request.getPrompt());
        System.out.println("Agent ID : " + request.getAgentId());
        System.out.println("==================================");

        return aiService.execute(
                request.getProvider(),
                request.getModel(),
                request.getPrompt(),
                request.getAgentId()
        );
    }

    // =========================
    // GET GEMINI MODELS
    // =========================

   

    // =========================
    // REQUEST DTO
    // =========================

    public static class AIRequest {

        private String provider;
        private String model;
        private String prompt;
        private Long agentId;

        public String getProvider() {
            return provider;
        }

        public void setProvider(String provider) {
            this.provider = provider;
        }

        public String getModel() {
            return model;
        }

        public void setModel(String model) {
            this.model = model;
        }

        public String getPrompt() {
            return prompt;
        }

        public void setPrompt(String prompt) {
            this.prompt = prompt;
        }

        public Long getAgentId() {
            return agentId;
        }

        public void setAgentId(Long agentId) {
            this.agentId = agentId;
        }
    }
}