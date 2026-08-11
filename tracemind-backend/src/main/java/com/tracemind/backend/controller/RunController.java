package com.tracemind.backend.controller;

import com.tracemind.backend.dto.RecentRunDTO;
import com.tracemind.backend.entity.Run;
import com.tracemind.backend.service.RunService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/runs")
@CrossOrigin("*")
public class RunController {

    private final RunService service;

    public RunController(RunService service) {

        this.service = service;

    }

    @PostMapping
    public Run save(@RequestBody Run run) {

        return service.save(run);

    }

    @GetMapping
    public List<Run> all() {

        return service.findAll();

    }

    @GetMapping("/recent")
    public List<RecentRunDTO> recentRuns() {

        return service.getRecentRuns();

    }

    @GetMapping("/{id}")
    public Run one(@PathVariable Long id) {

        return service.findById(id);

    }
@DeleteMapping("/{id}")
public void delete(@PathVariable Long id) {

    service.delete(id);

}
    @GetMapping("/agent/{agentId}")
    public List<Run> byAgent(@PathVariable Long agentId) {

        return service.findByAgent(agentId);

    }

}