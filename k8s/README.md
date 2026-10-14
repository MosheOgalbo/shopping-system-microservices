# Kubernetes (local)

Deploy FreshCart to a local cluster (`kind`, `minikube`, or Docker Desktop Kubernetes).

## Prerequisites

- Docker
- `kubectl`
- Cluster with an ingress controller (nginx recommended)
- Enough memory for SQL Server (about 4 GB free on the node)

## One-command deploy

```bash
chmod +x k8s/*.sh
./k8s/deploy.sh
```

This builds:

| Image | Role |
|---|---|
| `freshcart/server-net:latest` | Catalog API (.NET) |
| `freshcart/server-node:latest` | Orders API (Node) |
| `freshcart/app:latest` | React UI (APIs at `/api/`) |

Then applies everything under `k8s/` via Kustomize.

## Manual steps

```bash
./k8s/build-images.sh
kubectl apply -k k8s/
kubectl -n freshcart get pods
```

## Access without Ingress

```bash
kubectl -n freshcart port-forward svc/app 5173:5173
kubectl -n freshcart port-forward svc/server-net 5177:8080
kubectl -n freshcart port-forward svc/server-node 5001:5000
```

If you use port-forward to split hosts, rebuild the UI with localhost API URLs instead of `/api/`:

```bash
docker build \
  --build-arg VITE_API_PRODUCTS=http://localhost:5177/api/ \
  --build-arg VITE_API_ORDERS=http://localhost:5001/api/ \
  -t freshcart/app:latest shopping-client
kubectl -n freshcart rollout restart deployment/app
```

## Access with nginx Ingress

1. Install nginx ingress for your cluster.
2. Add to `/etc/hosts`: `127.0.0.1 freshcart.local`
3. Open `http://freshcart.local`

Ingress routes:

| Path | Service |
|---|---|
| `/api/orders` | `server-node` |
| `/api/Products`, `/api/Categories` | `server-net` |
| `/` | `app` |

## Notes

- Secrets in `secrets.yaml` are **demo values only**.
- SQL Server image is `linux/amd64`; on Apple Silicon use an amd64 node or emulation.
- For AWS EKS, see [`../aws/README.md`](../aws/README.md).
