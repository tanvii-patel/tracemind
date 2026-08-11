package com.tracemind.backend.repository;

import com.tracemind.backend.entity.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgentRepository
        extends JpaRepository<Agent,Long>{

}