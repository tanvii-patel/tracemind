# TraceMind

### AI Execution Monitoring & Observability Platform

TraceMind is a full-stack AI observability platform built to monitor, execute, and analyze AI workloads from a single dashboard.

It provides a structured way to work with AI agents, execute Gemini models, track individual runs, record execution history, and monitor metrics such as duration, status, and cost.

The project combines a **Spring Boot backend**, **React frontend**, **SQL database**, **JWT authentication**, and **Google Gemini API** into one application.


## Overview

AI applications can quickly become difficult to monitor once multiple prompts, agents, and executions are involved.

TraceMind addresses this by keeping AI execution data in one place.

Instead of treating an AI request as a simple:

Prompt → Response


TraceMind records the execution as an observable run:


Agent
   ↓
AI Execution
   ↓
Model
   ↓
Response
   ↓
Run Metadata
   ├── Status
   ├── Duration
   ├── Cost
   └── Timestamp

This makes it possible to inspect what happened during an AI execution rather than only looking at the final response.

---

## Features

### AI Playground

Execute Gemini directly from the application.

* Gemini execution
* Prompt input
* Agent association
* Execution status
* Response display
* Execution duration
* Cost tracking
* Error handling
* Loading state

---

### Agent Management

Create and manage AI agents through the application.

* Create agents
* Edit agents
* Delete agents
* Search agents
* Assign models
* Activate/deactivate agents
* Track total runs
* Track total cost

Each agent can be associated with AI executions, allowing its activity to be monitored over time.

---

### Run Tracking

Every AI execution can be stored as a run.

Tracked information includes:

| Field      | Description                         |
| ---------- | ----------------------------------- |
| Agent      | Agent associated with the execution |
| Provider   | AI provider used                    |
| Model      | Model used                          |
| Prompt     | Input sent to the model             |
| Response   | Generated output                    |
| Status     | Execution result                    |
| Duration   | Execution time                      |
| Cost       | Execution cost                      |
| Created At | Execution timestamp                 |

---

### Execution History

TraceMind maintains an activity history for important events such as:

* Agent creation
* Agent updates
* Agent deletion
* AI executions
* Failed executions

This provides a chronological view of activity inside the platform.

---

### Authentication

The backend uses JWT-based authentication.

Protected API requests require a valid JWT token:

Login
  ↓
JWT Token
  ↓
Frontend
  ↓
Authorization: Bearer <token>
  ↓
Spring Boot
  ↓
JWT Validation
  ↓
Protected Resource


---

### Dashboard

The dashboard provides a centralized view of the application's activity and AI usage.

It can be used to monitor:

* Agent activity
* AI executions
* Run statistics
* Cost information
* Execution trends
* Recent activity

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Bootstrap
* CSS
* Axios
* Lucide React

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* JWT Authentication

### Database

* MySQL
* Hibernate / JPA

### AI

* Google Gemini API

### Development Tools

* Git
* GitHub
* VS Code
* Maven

---

## Architecture

                    ┌──────────────────────┐
                    │      React UI        │
                    │                      │
                    │ Dashboard            │
                    │ AI Playground        │
                    │ Agents               │
                    │ Runs                 │
                    │ History              │
                    └──────────┬───────────┘
                               │
                            Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Spring Boot API   │
                    │                      │
                    │ Controllers          │
                    │ Services             │
                    │ Security             │
                    │ JPA / Hibernate      │
                    └───────┬───────┬──────┘
                            │       │
                 ┌──────────┘       └──────────┐
                 ▼                             ▼
        ┌────────────────┐            ┌────────────────┐
        │    MySQL       │            │ Google Gemini  │
        │                │            │      API       │
        │ Agents         │            │                │
        │ Runs           │            │ AI Responses   │
        │ Users          │            └────────────────┘
        │ History        │
        └────────────────┘

---

## Project Structure

TraceMind/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── tracemind/
│   │       │           └── backend/
│   │       │               ├── controller/
│   │       │               ├── entity/
│   │       │               ├── repository/
│   │       │               ├── service/
│   │       │               ├── security/
│   │       │               └── provider/
│   │       │
│   │       └── resources/
│   │
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md


---

## Core Data Model

TraceMind currently revolves around four important areas of data.

### User

Handles authentication and application access.


User
├── id
├── email
├── fullName
├── password
└── role


### Agent

Represents an AI agent configured inside TraceMind.

Agent
├── id
├── name
├── description
├── model
├── status
├── totalRuns
└── totalCost


### Run

Represents an individual AI execution.

Run
├── id
├── agentId
├── provider
├── model
├── prompt
├── response
├── status
├── cost
├── duration
└── createdAt


### History

Stores application activity and important events.

---

## AI Execution Flow

When an execution is started from the AI Playground:


User enters prompt
        ↓
Selects / enters Agent ID
        ↓
React sends request
        ↓
POST /api/ai/execute
        ↓
AIController
        ↓
AIService
        ↓
Validate request
        ↓
Load Agent (if provided)
        ↓
Check Agent status
        ↓
Resolve AI model
        ↓
GeminiProvider
        ↓
Google Gemini API
        ↓
Receive response
        ↓
Create Run record
        ↓
Update Agent statistics
        ↓
Create History event
        ↓
Return result to React


---

## API

### Authentication

POST /api/auth/register
POST /api/auth/login


### Agents


GET    /api/agents
GET    /api/agents/{id}
POST   /api/agents
PUT    /api/agents/{id}
DELETE /api/agents/{id}


### AI


POST /api/ai/execute


Example request:


{
  "provider": "GEMINI",
  "model": "gemini-3.5-flash",
  "prompt": "Explain binary search in simple terms.",
  "agentId": 1
}


Example response:


{
  "id": 42,
  "agentId": 1,
  "provider": "GEMINI",
  "model": "gemini-3.5-flash",
  "prompt": "Explain binary search in simple terms.",
  "response": "...",
  "status": "SUCCESS",
  "cost": 0.0,
  "duration": 842,
  "createdAt": "2026-08-11T20:30:00"
}


---

## Environment Configuration

API keys and secrets should **never be committed to GitHub**.

Set the Gemini API key as an environment variable:


GOOGLE_API_KEY=your_api_key_here


The backend reads the key from the environment when creating the Gemini client.

For local development, configure the variable before starting Spring Boot.

### Windows PowerShell


$env:GOOGLE_API_KEY="your_api_key_here"


Then start the backend:


mvnw spring-boot:run


Do not place the real API key directly inside Java source code.

---

## Running Locally

### 1. Clone

git clone https://github.com/tanvii-patel/tracemind
cd TraceMind


---

### 2. Start MySQL

Create the database:

CREATE DATABASE tracemind;


Configure the database connection in the backend configuration.

---

### 3. Configure Gemini

Set:

GOOGLE_API_KEY=your_api_key_here

---

### 4. Start Backend

cd backend
mvnw spring-boot:run


Backend:


http://trace-mind.onrender.com



### 5. Start Frontend

Open another terminal:


cd frontend
npm install
npm run dev


Vite will provide the frontend URL, usually:


http://localhost:5173


---

## Security Notes

TraceMind uses JWT authentication for protected resources.

Production deployments should additionally:

* Store secrets in environment variables
* Use HTTPS
* Restrict CORS to the deployed frontend
* Use a production database
* Avoid committing `.env` files
* Avoid exposing API keys in React
* Use secure JWT configuration

---


## Why TraceMind?

TraceMind was built around a simple idea:

> AI applications should be observable, not just executable.

A model returning a response is only one part of an AI system.

Knowing **which agent executed it, which model was used, how long it took, how much it cost, whether it succeeded, and what happened afterward** provides much more useful information when building and maintaining AI applications.

---

## Future Improvements

Possible extensions include:

* Multiple AI providers
* OpenAI integration
* Anthropic integration
* Streaming AI responses
* Token usage tracking
* Real API-based cost calculation
* Agent-level analytics
* Model comparison
* Run filtering and advanced search
* Exportable execution reports
* Real-time execution monitoring
* Production deployment
* Role-based access control
* Rate limiting
* API usage limits

---

## Author

**Tanvi Patel**

B.Tech Computer Science & Engineering

Interested in:

* AI/ML
* Data Analytics
* Full-Stack Development
* Backend Engineering
* Intelligent Systems

---

## License

This project is currently intended as a personal/portfolio project.
