package com.tracemind.backend.service;

import com.tracemind.backend.entity.History;
import com.tracemind.backend.repository.HistoryRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {

    private final HistoryRepository repository;

    public HistoryService(HistoryRepository repository) {
        this.repository = repository;
    }

    public History save(String action, String description) {

        History history = new History();

        history.setAction(action);
        history.setDescription(description);

        history.setCreatedAt(java.time.LocalDateTime.now());

        return repository.save(history);

    }

    public List<History> findAll() {

        return repository.findAll();

    }

}