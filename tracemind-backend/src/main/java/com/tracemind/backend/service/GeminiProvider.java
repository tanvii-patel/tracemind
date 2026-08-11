package com.tracemind.backend.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Model;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeminiProvider implements AIProvider {

    private Client client;

    @Override
    public String getProviderName() {
        return "GEMINI";
    }

    private Client getClient() {

        if (client == null) {

            String apiKey = System.getenv("GOOGLE_API_KEY");

            if (apiKey == null || apiKey.isBlank()) {
                throw new IllegalStateException(
                        "GOOGLE_API_KEY environment variable is not set"
                );
            }

            client = Client.builder()
                    .apiKey(apiKey)
                    .build();
        }

        return client;
    }

    @Override
    public String generate(String model, String prompt) {

        GenerateContentResponse response =
                getClient().models.generateContent(
                        model,
                        prompt,
                        null
                );

        return response.text();
    }

    public List<String> getAvailableModels() {

        List<String> models = new ArrayList<>();

        for (Model model : getClient().models.list(null)) {

            if (model.name().isPresent()
                    && model.supportedActions().isPresent()
                    && model.supportedActions()
                        .get()
                        .contains("generateContent")) {

                models.add(model.name().get());
            }
        }

        return models;
    }
}