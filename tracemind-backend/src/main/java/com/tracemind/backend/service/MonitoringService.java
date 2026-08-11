package com.tracemind.backend.service;

import com.tracemind.backend.dto.SystemHealthDTO;
import com.tracemind.backend.repository.AgentRepository;
import com.tracemind.backend.repository.RunRepository;

import org.springframework.stereotype.Service;

import java.lang.management.ManagementFactory;

@Service
public class MonitoringService {

    private final AgentRepository agentRepository;
    private final RunRepository runRepository;

    public MonitoringService(
            AgentRepository agentRepository,
            RunRepository runRepository
    ) {

        this.agentRepository = agentRepository;
        this.runRepository = runRepository;

    }

    public SystemHealthDTO getHealth() {

        SystemHealthDTO dto = new SystemHealthDTO();

        com.sun.management.OperatingSystemMXBean os =
                (com.sun.management.OperatingSystemMXBean)
                        ManagementFactory.getOperatingSystemMXBean();

        dto.setCpuUsage(
                os.getCpuLoad() * 100
        );

        dto.setMemoryUsage(

                ((double)
                        (os.getTotalMemorySize() - os.getFreeMemorySize())

                        / os.getTotalMemorySize()) * 100

        );

        dto.setDiskUsage(0);

        dto.setRunningAgents(

                agentRepository.count()

        );

        dto.setActiveWorkflows(

                runRepository.count()

        );

        dto.setFailedRuns(0);

        return dto;

    }

}