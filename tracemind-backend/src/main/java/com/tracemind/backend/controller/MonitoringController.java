package com.tracemind.backend.controller;

import com.tracemind.backend.dto.SystemHealthDTO;
import com.tracemind.backend.service.MonitoringService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/monitoring")
@CrossOrigin("*")
public class MonitoringController {

    private final MonitoringService service;

    public MonitoringController(
            MonitoringService service
    ) {

        this.service = service;

    }

    @GetMapping

    public SystemHealthDTO health() {

        return service.getHealth();

    }

}