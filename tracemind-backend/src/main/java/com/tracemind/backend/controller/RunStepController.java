package com.tracemind.backend.controller;

import com.tracemind.backend.entity.RunStep;
import com.tracemind.backend.service.RunStepService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/steps")
public class RunStepController {

    private final RunStepService service;

    public RunStepController(RunStepService service) {
        this.service = service;
    }

    @PostMapping
    public RunStep save(@RequestBody RunStep step) {
        return service.save(step);
    }

    @GetMapping
    public String test() {
        return "Controller Working";
    }

  @GetMapping("/timeline/{runId}")
public List<RunStep> timeline(@PathVariable("runId") Long runId) {

    System.out.println("RUN ID = " + runId);

    return service.getTimeline(runId);

}

}