# 🏭 Manufacturing Monitoring System

This system is designed to give you **real-time visibility** into your manufacturing floor. From the moment a machine completes a test to the second it appears on your dashboard, I built it to handle the entire data pipeline so you can focus on what matters: quality and throughput.

## ✨ What Does This Do?

Managing high-volume test data can be chaotic. I simplified this by:
1.  **Collecting** raw data straight from your machines.
2.  **Validating** and determining if a test passed or failed based on custom business rules.
3.  **Storing** everything securely in a persistent database.
4.  **Broadcasting** live results to a clean, easy-to-read dashboard instantly.

---

## 🏗 How It Works (The Architecture)

I built this using a reliable microservices approach to ensure it scales as the factory grows:

*   **⚡ Ingestion Service** (Python/FastAPI): The "front door." It accepts incoming machine data, checks for basic errors, and passes it off to the queue.
*   **⚙️ Processing Service** (Python Worker): The "brains." It picks up data from the queue, decides if it’s a PASS or FAIL, and saves the result.
*   **📊 API Service** (Python/FastAPI): The "connector." It provides historical data and maintains a live connection (WebSockets) for real-time updates.
*   **🖥 Frontend Dashboard** (React + Tailwind): The "window." A modern, responsive interface to watch production metrics live.

### Tech Stack
*   **Backend**: Python 3.10+ (FastAPI, SQLAlchemy, RabbitMQ)
*   **Frontend**: TypeScript, React, Vite, Recharts
*   **Infrastructure**: Docker & Docker Compose for easy deployment

---

## 🚀 Getting Started

Ready to see it in action? Follow these steps to get the system running locally.

### Prerequisites
*   **Docker** (Make sure the Docker Desktop or Daemon is running)
*   **Docker Compose**

### Setup
1.  **Clone the project**:
    ```bash
    git clone <repo_url>
    cd manufacturing-backend
    ```

2.  **Launch everything**:
    ```bash
    docker-compose up --build
    ```

3.  **Open the Dashboard**:
    Head over to [http://localhost:5173](http://localhost:5173) in your browser.

4.  **Explore the APIs** (Optional):
    *   **Data Ingestion**: [http://localhost:8001/docs](http://localhost:8001/docs)
    *   **Data Retrieval**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🧪 Testing the Pipeline

Want to see data appear live? Send a sample test pulse to the ingestion service:

```bash
curl -X POST http://localhost:8001/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "barcode": "SN-1001",
    "machine_id": "MACH-01",
    "product_id": "PROD-A",
    "test_step": "voltage_test",
    "measured_value": 85.5,
    "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"
  }'
```

Watch the dashboard—you should see the new data point pop up immediately!

### Running Unit Tests
To run the automated test suite:
```bash
docker-compose run api pytest
```

---

## 📂 Folder Structure

```
.
├── backend/
│   ├── ingestion/
│   ├── processing/
│   └── api/
├── frontend/
├── docker-compose.yml
└── README.md
```

---

## 📈 Built to Scale

*   **Smart Decoupling**: I used RabbitMQ so that even if the database is busy, the machines can keep sending data without getting blocked.
*   **Ready for Growth**: Every component is stateless, meaning you can easily run multiple copies of any service if traffic increases.
*   **Async Performance**: Built with modern asynchronous Python to handle many connections at once efficiently.
