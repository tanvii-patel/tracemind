package com.tracemind.backend.repository;

import com.tracemind.backend.entity.RunStep;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RunStepRepository
        extends JpaRepository<RunStep,Long>{

    List<RunStep> findByRunIdOrderByStepNo(Long runId);

}