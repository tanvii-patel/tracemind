package com.tracemind.backend.controller;

import com.tracemind.backend.dto.DashboardResponse;
import com.tracemind.backend.service.DashboardService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService
    ) {

        this.dashboardService = dashboardService;

    }

    @GetMapping
    public DashboardResponse dashboard() {

        return dashboardService.getDashboardStats();

    }

}