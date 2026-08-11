package com.tracemind.backend.controller;

import com.tracemind.backend.dto.AnalyticsDTO;
import com.tracemind.backend.service.AnalyticsService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin("*")
public class AnalyticsController {

    private final AnalyticsService service;

    public AnalyticsController(AnalyticsService service) {

        this.service = service;
    }

    @GetMapping
    public AnalyticsDTO analytics() {

        return service.getAnalytics();
    }
}