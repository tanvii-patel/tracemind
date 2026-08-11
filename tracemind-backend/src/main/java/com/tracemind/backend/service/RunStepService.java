package com.tracemind.backend.service;

import com.tracemind.backend.entity.RunStep;
import com.tracemind.backend.repository.RunStepRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RunStepService {

    private final RunStepRepository repository;

    public RunStepService(
            RunStepRepository repository
    ){

        this.repository=repository;

    }

    public RunStep save(
            RunStep step
    ){

        return repository.save(step);

    }

    public List<RunStep> getTimeline(
            Long runId
    ){

        return repository.findByRunIdOrderByStepNo(runId);

    }

}