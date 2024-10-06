# FrostAway

---

FrostAway is an innovative system for monitoring agricultural lands, aimed at predicting and preventing frost events with up to 24 hours of anticipation. By leveraging interconnected sensors and state-of-the-art AI models, FrostAway automates the process of alerting farmers and activating mechanisms to mitigate the effects of frost. The system integrates both hardware and software solutions, operating seamlessly across various platforms through Docker containerization.

---

## Architecture Breakdown

FrostAway is composed of three key components:

1. **Backend**:
   - **Technology Stack**: Python, Django, PostgreSQL, Mosquitto (MQTT), and Docker.
   - **Purpose**: The backend serves as the data processing hub, managing sensor data, running machine learning (ML) models, and handling communication with the frontend and alert systems.
   - **Core Functions**:
     - **Data Ingestion**: The backend collects real-time data from the field sensors (temperature, humidity, wind speed, etc.) sent via MQTT using the Mosquitto broker.
     - **ML Model Execution**: FrostAway’s AI model, built with Pytorch and hosted on the backend, processes historical and real-time data to predict frost events.
     - **API Endpoints**: Django REST Framework is used to provide APIs for the frontend and mobile applications, delivering predictions and alerts to the user.
     - **Database**: PostgreSQL stores historical data from the sensors, ML model outputs, and user configuration settings.

2. **Frontend**:
   - **Technology Stack**: Next.js, Shadcn, and Vercel for deployment.
   - **Purpose**: The frontend provides an intuitive and responsive user interface (UI) for farmers to monitor their fields and receive real-time updates on potential frost risks.
   - **Core Features**:
     - **Dashboard**: Displays real-time weather conditions and predictions for frost. Farmers can monitor multiple fields with detailed analytics on temperature, wind speed, and humidity.
     - **Alerts**: Visual and interactive notifications are provided on frost alerts, including the recommended mitigation action, such as turning on heaters or activating sprinklers.
     - **Mobile-Friendly**: The frontend is fully optimized for mobile use, allowing farmers to receive alerts and control mitigation mechanisms from anywhere.

3. **Machine Learning (ML) System**:
   - **Technology Stack**: Python, Pytorch, Graph Neural Networks (GNN), Recurrent Neural Networks (RNN), Docker.
   - **Purpose**: The ML model is the core of FrostAway, built to predict frost events based on spatiotemporal data from the field. The model learns from historical weather data and continuously refines its predictions as new data is ingested.
   - **Model Details**:
     - **Graph Neural Networks (GNN)**: This component captures the spatial relationships between different sensors in the field, allowing the model to understand environmental interactions across distances.
     - **Recurrent Neural Networks (RNN)**: A temporal processing unit designed to capture the time-series nature of the data, which is essential for accurate weather predictions.
     - **Dockerized ML Pipelines**: The entire ML pipeline is containerized using Docker for scalability and portability, enabling easy deployment across various cloud environments.

---

## System Workflow

1. **Field Setup**:
   - "Guardians" (sensors) are deployed across the agricultural land at strategic locations to monitor environmental variables like temperature, pressure, humidity, and wind speed.
   - These sensors are interconnected via LoRa and send data to the backend using the MQTT protocol through Mosquitto.

2. **Real-Time Data Processing**:
   - The backend ingests data from the sensors and stores it in PostgreSQL.
   - The data is immediately passed to the ML model, which runs predictions for upcoming frost events based on the current data and historical patterns.

3. **Frost Prediction**:
   - The Graph Neural Network (GNN) component analyzes spatial relationships between sensors.
   - The Recurrent Neural Network (RNN) processes temporal data to predict frost with high accuracy.
   - Predictions are then returned to the backend, where they are stored and served to the frontend via API endpoints.

4. **Alert System**:
   - Based on the predictions, alerts are sent to the farmer via various communication channels (SMS, WhatsApp, Radio).
   - If configured, the system can also automate the activation of mitigation mechanisms such as:
     - **Sprinkler Systems**: Activated to create a protective ice layer on crops.
     - **Wind Machines**: Used to mix warmer air from higher altitudes with colder ground-level air.
     - **Heaters**: Turned on to raise the temperature in vulnerable areas.

---

## Deployment and Infrastructure

- **Docker Integration**:
  - The entire system, including the backend, frontend, and ML models, is containerized using Docker. This allows for easy deployment, scaling, and maintenance.
  - The Docker Compose setup orchestrates the services, ensuring the proper communication between containers, including database management, MQTT broker, and web server.

- **Backend Deployment**:
  - Deployed on Google Cloud Platform (GCP) with auto-scaling for the backend services to handle varying workloads depending on the number of connected sensors and real-time requests.
  - PostgreSQL runs on a managed GCP Cloud SQL instance for reliable data storage.

- **Frontend Deployment**:
  - The frontend is deployed using Vercel, ensuring a seamless and responsive user experience with global CDN support for fast load times across all devices.

---

## Key Technologies and Tools

- **Backend**:
  - **Django REST Framework**: Provides APIs for communication between the frontend and backend.
  - **Mosquitto (MQTT)**: Handles messaging between field sensors and the backend.
  - **PostgreSQL**: Stores historical and real-time sensor data, as well as user configurations.
  - **Pytorch**: Core framework for building and running the AI models.
  - **Docker**: Ensures seamless containerized deployment of the entire system.

- **Frontend**:
  - **Next.js**: Provides the server-rendered React-based framework for building the frontend.
  - **Shadcn**: Used for creating reusable UI components that integrate seamlessly with the design.
  - **Vercel**: Deployment platform for the frontend, ensuring scalability and quick delivery of web assets.

- **Machine Learning (ML)**:
  - **Pytorch**: Framework for building deep learning models.
  - **Graph Neural Networks (GNN)**: Captures spatial dependencies between the different sensors in the field.
  - **Recurrent Neural Networks (RNN)**: Processes time-series data for temporal predictions.
  - **Docker**: Containerized model execution ensures consistency across different deployment environments.

---

## Future Projections

- **Scalability**: The architecture supports the addition of new sensors and new regions without significant modifications. By leveraging Docker, the system can be easily scaled horizontally to handle increased data loads.
- **Advanced AI Capabilities**: The next iteration of the system will integrate more complex weather patterns and seasonal data to improve prediction accuracy. Plans include incorporating other environmental factors like soil moisture and crop type.
- **Global Expansion**: The flexible nature of FrostAway’s design allows for easy adaptation to different regions and crops, potentially opening new markets in the future.
