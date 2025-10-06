# Food Delivery Microservices on Kubernetes

> **⚠️ Project Status:** This project is currently being upgraded. Some features may not work as described. Check back for updates.

A production-grade microservices application demonstrating a food delivery platform built with Node.js, Express, MongoDB, Docker, and Kubernetes.

## Overview

This project showcases a complete microservices architecture for a food delivery application. Each service operates independently in Docker containers, orchestrated through Kubernetes, with dedicated MongoDB databases and a unified frontend interface.

### Key Features

- **Independent microservices** for users, restaurants, orders, and delivery
- **Containerized deployment** using Docker
- **Kubernetes orchestration** with complete YAML manifests
- **Dedicated databases** for each service (MongoDB)
- **Frontend aggregator** built with EJS
- **Production-ready** architecture patterns

## Architecture

The application consists of four core microservices, each with its own database:

**User Service**  
Manages user registration, authentication, and profile operations.

**Restaurant Service**  
Handles restaurant information, menus, and related data.

**Order Service**  
Processes order placement, tracking, and management while coordinating with user and restaurant services.

**Delivery Service**  
Oversees delivery assignment and real-time tracking.

**Infrastructure**  
- Each service has a dedicated MongoDB instance deployed as a separate pod
- Services communicate via ClusterIP Services
- Frontend aggregator provides a unified dashboard
- Docker images hosted on Docker Hub (username: `nsvpavan`)

## Project Structure

```
food-delivery-app/
├── backend/
│   ├── user-service/
│   ├── restaurant-service/
│   ├── order-service/
│   └── delivery-service/
├── frontend-aggregator/
├── k8s/
│   ├── namespace.yaml
│   ├── *-service-deployment.yaml
│   ├── *-service-service.yaml
│   └── *-db-*.yaml
├── docker-compose.yml
└── README.md
```

## Prerequisites

Ensure you have the following installed:

- Docker
- Kubernetes cluster (Minikube, Docker Desktop, or cloud provider)
- kubectl configured for your cluster
- Docker Hub account (for custom images)

## Quick Start

### Local Development with Docker Compose

Run the entire stack locally for development:

```bash
docker-compose up --build
```

### Kubernetes Deployment

**1. Start Your Cluster**

```bash
minikube start --driver=docker
```

**2. Create Namespace**

```bash
kubectl apply -f k8s/namespace.yaml
```

**3. Deploy Databases**

```bash
kubectl apply -f k8s/user-db-deployment.yaml
kubectl apply -f k8s/user-db-service.yaml
kubectl apply -f k8s/restaurant-db-deployment.yaml
kubectl apply -f k8s/restaurant-db-service.yaml
kubectl apply -f k8s/order-db-deployment.yaml
kubectl apply -f k8s/order-db-service.yaml
kubectl apply -f k8s/delivery-db-deployment.yaml
kubectl apply -f k8s/delivery-db-service.yaml
```

**4. Deploy Microservices**

```bash
kubectl apply -f k8s/user-service-deployment.yaml
kubectl apply -f k8s/user-service-service.yaml
kubectl apply -f k8s/restaurant-service-deployment.yaml
kubectl apply -f k8s/restaurant-service-service.yaml
kubectl apply -f k8s/order-service-deployment.yaml
kubectl apply -f k8s/order-service-service.yaml
kubectl apply -f k8s/delivery-service-deployment.yaml
kubectl apply -f k8s/delivery-service-service.yaml
```

**5. Verify Deployment**

```bash
kubectl get pods -n fooddelivery
kubectl get deployments -n fooddelivery
```

## Configuration

### Environment Variables

Each service requires specific environment variables:

**User Service**
- `MONGO_URI`: `mongodb://user-db:27017/users`
- `PORT`: Service port
- `JWT_SECRET`: Authentication secret

**Restaurant Service**
- `MONGO_URI`: `mongodb://restaurant-db:27017/restaurants`
- `PORT`: Service port

**Cart Service**
- `MONGO_URI`: Database connection string
- `PORT`: Service port
- `JWT_SECRET`: Must match user service secret

**Order Service**
- `MONGODB_URI`: `mongodb://order-db:27017/orders`

**Delivery Service**
- `MONGODB_URI`: `mongodb://delivery-db:27017/delivery`

**Frontend**
- `VITE_RESTAURANT_URL`: Restaurant service URL
- `VITE_CART_URL`: Cart service URL
- `VITE_AUTH_URL`: Authentication service URL

### Docker Images

Images are tagged and pushed to Docker Hub:
```
nsvpavan/backend-user-service:latest
nsvpavan/backend-restaurant-service:latest
nsvpavan/backend-order-service:latest
nsvpavan/backend-delivery-service:latest
```

## Testing

### Access Services Locally

Port-forward a service to test locally:

```bash
kubectl port-forward svc/user-service 3001:3001 -n fooddelivery
curl http://localhost:3001/health
```

### Check Pod Status

```bash
kubectl get pods -n fooddelivery
```

### View Logs

```bash
kubectl logs <pod-name> -n fooddelivery
```

### Test Service Connectivity

Run a temporary pod to test DNS resolution:

```bash
kubectl run -it --rm --restart=Never busybox --image=busybox -n fooddelivery -- sh
```

Inside the pod:
```bash
wget -qO- http://user-db:27017
```

## Troubleshooting

**Database Connection Issues**

Verify environment variables point to correct service names (e.g., `user-db` not `user_db`). Check logs:

```bash
kubectl logs <pod-name> -n fooddelivery
```

**Changes Not Reflecting**

Force update deployment with new configuration:

```bash
kubectl rollout restart deployment/<deployment-name> -n fooddelivery
```

**Pod Not Starting**

Check pod events and status:

```bash
kubectl describe pod <pod-name> -n fooddelivery
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss your proposed changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Built with** Node.js • Express • MongoDB • Docker • Kubernetes
