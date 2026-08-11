package com.tracemind.backend.repository;

import com.tracemind.backend.entity.Run;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RunRepository extends JpaRepository<Run, Long> {

    List<Run> findByAgentId(Long agentId);
List<Run> findTop5ByOrderByIdDesc();
long countByStatus(String status);

@Query("SELECT AVG(r.cost) FROM Run r")
Double averageCost();

@Query("SELECT AVG(r.duration) FROM Run r")
Double averageDuration();
}