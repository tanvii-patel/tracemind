package com.tracemind.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "run_steps")
public class RunStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long runId;

    private Integer stepNo;

    private String title;

    @Column(length = 4000)
    private String description;

    private String status;

    public RunStep(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id=id;
    }

    public Long getRunId() {
        return runId;
    }

    public void setRunId(Long runId) {
        this.runId=runId;
    }

    public Integer getStepNo() {
        return stepNo;
    }

    public void setStepNo(Integer stepNo) {
        this.stepNo=stepNo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title=title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description=description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status=status;
    }

}