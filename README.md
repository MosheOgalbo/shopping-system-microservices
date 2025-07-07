# 🛒 Shopping System Microservices

<div align="center">

![Microservices](https://img.shields.io/badge/Architecture-Microservices-blue?style=for-the-badge)
![.NET](https://img.shields.io/badge/.NET-8.0-purple?style=for-the-badge&logo=dotnet)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=for-the-badge&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=for-the-badge&logo=docker)

**A minimal polyglot microservices architecture for an e-commerce demo with modern Hebrew interface**

[🚀 Live Demo](#-installation--run) | [📋 Features](#-key-features) | [🏗️ Architecture](#-architecture) | [🛠️ Tech Stack](#-tech-stack)

</div>

---

## 🎯 Overview

A demo shopping platform showcasing enterprise-grade microservices architecture with:

- **server-net**: ASP.NET Core Web API to manage products with PostgreSQL
- **server-node**: Express.js API to handle orders/users with MongoDB
- **shopping-client**: TypeScript SPA frontend (built with Vite) featuring a modern Hebrew interface

*The frontend communicates with both backend services: fetching products from the ASP.NET Core service and submitting orders to the Node.js service.*

All services run in Docker Compose for easy local development and testing, demonstrating expertise in polyglot programming, database design, and modern frontend development.

## 🖥️ Frontend Overview

The shopping client is a modern TypeScript SPA built with Vite, featuring a clean Hebrew interface with comprehensive e-commerce functionality:

### 🛒 Orders Management Screen
![Orders Screen](./imags/Orders-screen.png)

The orders screen provides a comprehensive order management interface featuring:
- **✅ Order Completion Process**: Complete order workflow with customer details form
- **👤 Customer Information**: Fields for first name, last name, delivery address, and email
- **📋 Order Summary**: Shopping cart overview with selected items
- **🎨 Modern UI**: Clean, responsive design with Hebrew RTL support
- **📤 Order Confirmation**: Submit orders directly to the Node.js backend

### 🛍️ Products Catalog Screen
![Products Screen](./imags/Products-screen.png)

The products screen offers a full-featured product browsing experience:
- **🔍 Product Search**: Search functionality to find products quickly
- **📂 Category Filtering**: Filter products by categories
- **💰 Price Sorting**: Sort products by price (ascending/descending)
- **🖼️ Product Display**: Shows product images, names, and prices
- **⚡ Real-time Data**: Fetches product data from the ASP.NET Core PostgreSQL backend
- **📱 Responsive Design**: Optimized for various screen sizes

*The frontend seamlessly integrates with both microservices, calling the ASP.NET Core API for product catalog and the Node.js API for order management.*

## ✨ Key Features

### 🏢 **Enterprise Architecture**
- **Microservices Design Pattern** with clear domain boundaries
- **Database per Service** pattern for data isolation
- **Polyglot Programming** leveraging the best tools for each service
- **Hebrew RTL Interface** with modern UX/UI design

### 🛡️ **Production Ready**
- **Docker Compose** orchestration for development and deployment
- **Health Monitoring** with built-in health checks
- **Data Persistence** with Docker volumes
- **Cross-Service Communication** via RESTful APIs

### 🎨 **Modern Frontend**
- **TypeScript SPA** with Vite for optimal performance
- **Hebrew Interface** with RTL support
- **React + Redux** for state management
- **Responsive Design** for all devices

---

## 🏗️ Architecture

```mermaid
graph TB
    Client[🖥️ React Frontend<br/>Hebrew Interface<br/>Port: 5173]

    subgraph "🌐 API Layer"
        ProductsAPI[📦 Products Service<br/>ASP.NET Core<br/>Port: 5177]
        OrdersAPI[⚙️ Orders Service<br/>Node.js + Express<br/>Port: 5001]
    end

    subgraph "💾 Data Layer"
        PostgresDB[(🐘 PostgreSQL<br/>Products Catalog)]
        MongoDB[(🍃 MongoDB<br/>Orders & Users)]
    end

    Client --> ProductsAPI
    Client --> OrdersAPI
    ProductsAPI --> PostgresDB
    OrdersAPI --> MongoDB

    classDef frontend fill:#61dafb,stroke:#333,stroke-width:2px
    classDef backend fill:#512bd4,stroke:#333,stroke-width:2px
    classDef database fill:#336791,stroke:#333,stroke-width:2px
    classDef node fill:#68a063,stroke:#333,stroke-width:2px
    classDef mongo fill:#47a248,stroke:#333,stroke-width:2px

    class Client frontend
    class ProductsAPI backend
    class OrdersAPI node
    class PostgresDB database
    class MongoDB mongo
```

### 🔧 **Service Architecture**

| Service | Framework | Port | Database | Health Endpoint | Responsibility |
|---------|-----------|------|----------|-----------------|----------------|
| **server-net** | ASP.NET Core | 5177 | PostgreSQL | `/health` | Product catalog, Inventory |
| **server-node** | TypeScript/Express | 5001 | MongoDB | `/healthz` | Order management, User data |
| **shopping-client** | React/Vite | 5173 | — | N/A | Hebrew UI, State management |

The system follows a microservices architecture pattern with clear separation of concerns, where each service handles its own domain and database.

---

## 🛠️ Tech Stack

<div align="center">

### Backend Technologies
![.NET Core](https://img.shields.io/badge/.NET_Core-8.0-512BD4?style=flat-square&logo=dotnet)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=flat-square&logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)

### Frontend Technologies
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat-square&logo=redux)
![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3)

### Databases
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=flat-square&logo=mongodb)

### DevOps & Tools
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat-square&logo=docker)

</div>

---

## 🚀 Installation & Run

### Prerequisites

```bash
# Required tools
- Docker & Docker Compose (v1.29+)
- Node.js & npm (v18+)
- .NET 8 SDK (optional, for development)
```

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/MosheOgalbo/shopping-system-microservices.git
cd shopping-system-microservices

# 2. Build and start all services
docker-compose up --build -d

# 3. Verify services are running
docker-compose ps
```

### 🌐 Access the Application

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Modern Hebrew shopping interface |
| **Products API** | http://localhost:5177/api/products | ASP.NET Core product catalog |
| **Orders API** | http://localhost:5001/api/orders | Node.js order management |

### 🎯 Using the Application

1. **Products Screen (קניות)**: Browse and search the product catalog
2. **Orders Screen (הזמנה)**: Place orders with customer information
3. **Data Persistence**: All data persists across container restarts in Docker volumes

---

## 📋 API Documentation

### 📦 Products Service (ASP.NET Core)

#### Endpoints

```http
GET    /api/products         # Get all products
GET    /api/products/{id}    # Get specific product
POST   /api/products         # Create new product
GET    /health               # Health check
```

#### Create Product Example

```json
POST /api/products
Content-Type: application/json

{
  "Id": 2,
  "Name": "Blue Shirt",
  "Description": "High-quality cotton shirt",
  "Price": 89.99,
  "CategoryId": 2,
  "CategoryName": "Clothing",
  "CreatedAt": "2025-06-26T11:40:17.083613"
}
```

### 🛒 Orders Service (Node.js)

#### Endpoints

```http
GET    /api/orders           # Get all orders
GET    /api/orders/{id}      # Get specific order
POST   /api/orders           # Create new order
GET    /healthz              # Health check
```

#### Create Order Example

```json
POST /api/orders
Content-Type: application/json

{
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "address": "123 Main St, City, Country"
  },
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "name": "Blue Shirt",
      "quantity": 2
    }
  ]
}
```

---

## 🔧 Environment Configuration

### Environment Variables

Create `.env` files in each service directory:

```bash
# server-net/.env
POSTGRES_USER=admin
POSTGRES_PASSWORD=your_secure_password
DATABASE_URL=postgres://admin:your_secure_password@postgres:5432/productsdb

# server-node/.env
MONGO_URI=mongodb://mongo:27017/orders
NODE_ENV=production

# shopping-client/.env
VITE_API_PRODUCTS=http://localhost:5177/api/products
VITE_API_ORDERS=http://localhost:5001/api/orders
```

---

## 📊 Example Usage

### Using cURL

```bash
# List all products
curl -X GET http://localhost:5177/api/products

# Create a new order
curl -X POST http://localhost:5001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "firstName": "Alice",
      "lastName": "Smith",
      "email": "alice.smith@example.com",
      "address": "456 Oak Ave, Downtown"
    },
    "items": [
      {
        "productId": "507f1f77bcf86cd799439011",
        "name": "Blue Shirt",
        "quantity": 1
      }
    ]
  }'

# Check service health
curl http://localhost:5177/health
curl http://localhost:5001/healthz
```

---

## 💾 Databases & Persistence

### Data Storage

- **PostgreSQL**: Data persisted in `postgres-data` volume
- **MongoDB**: Data persisted in `mongo-data` volume

Data remains available across container restarts, ensuring development continuity.

### Database Schemas

#### PostgreSQL (Products)
```sql
-- Products table
CREATE TABLE Products (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10,2) NOT NULL,
    CategoryId INTEGER NOT NULL,
    CategoryName VARCHAR(100) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### MongoDB (Orders & Users)
```javascript
// Orders collection
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "address": "123 Main St, City, Country"
  },
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "name": "Blue Shirt",
      "quantity": 2
    }
  ],
  "createdAt": ISODate("2025-06-26T11:40:17.083613"),
  "status": "pending"
}
```

---

## 🔍 Health & Resilience

### Health Check Endpoints

```bash
# Check Products service health
curl http://localhost:5177/health

# Check Orders service health
curl http://localhost:5001/healthz
```

### Docker Health Monitoring

- Each API service has a **health-check** endpoint
- Docker Compose uses `depends_on` and `healthcheck` to ensure proper startup sequence
- Automatic restarts on failure for improved resilience

```yaml
# Example health check configuration
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:5177/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 10s
```

---

## 🚀 Future Enhancements

### 🛡️ **Security & Authentication**
- [ ] JWT authentication implementation
- [ ] API rate limiting and request validation
- [ ] HTTPS configuration with SSL certificates
- [ ] Input validation middleware

### 🏗️ **Infrastructure & Scalability**
- [ ] API Gateway implementation
- [ ] Kubernetes deployment manifests
- [ ] Auto-scaling configuration
- [ ] Load balancing setup

### 📊 **Observability & Monitoring**
- [ ] Structured logging with Serilog/Winston
- [ ] Monitoring with Prometheus & Grafana
- [ ] Distributed tracing with Jaeger
- [ ] Application performance monitoring

### 🔄 **CI/CD & Testing**
- [ ] GitHub Actions automated pipelines
- [ ] Unit and integration test coverage
- [ ] Code quality checks (SonarQube)
- [ ] Automated deployment strategies

---

## 🧪 Testing

### Run Tests

```bash
# Backend tests (.NET)
cd server-net
dotnet test --verbosity normal

# Backend tests (Node.js)
cd server-node
npm test

# Frontend tests (React)
cd shopping-client
npm run test
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by Moshe Ogalbo

</div>
