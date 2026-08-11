package com.tracemind.backend.service;

public interface AIProvider {

    String getProviderName();

    String generate(
            String model,
            String prompt
    );
}