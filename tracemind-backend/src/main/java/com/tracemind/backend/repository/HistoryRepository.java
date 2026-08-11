package com.tracemind.backend.repository;

import com.tracemind.backend.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long> {
}