package com.tracemind.backend.controller;

import com.tracemind.backend.entity.History;
import com.tracemind.backend.service.HistoryService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin("*")
public class HistoryController {

    private final HistoryService service;

    public HistoryController(HistoryService service) {

        this.service = service;

    }

    @GetMapping
    public List<History> all() {

        return service.findAll();

    }

}