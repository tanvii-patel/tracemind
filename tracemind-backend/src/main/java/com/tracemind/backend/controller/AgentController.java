package com.tracemind.backend.controller;

import com.tracemind.backend.entity.Agent;
import com.tracemind.backend.service.AgentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agents")
@CrossOrigin("*")
public class AgentController {

    private final AgentService service;

    public AgentController(AgentService service) {

        this.service = service;

    }

    @PostMapping
    public Agent save(@RequestBody Agent agent) {

        return service.save(agent);

    }

    @GetMapping
    public List<Agent> all() {

        return service.findAll();

    }

    @GetMapping("/{id}")
    public Agent one(@PathVariable Long id) {

        return service.findById(id);

    }

    @PutMapping("/{id}")
    public Agent update(
            @PathVariable Long id,
            @RequestBody Agent agent
    ) {

        return service.update(id, agent);

    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        service.delete(id);

    }

}