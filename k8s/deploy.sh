#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
K8S_DIR="${ROOT_DIR}/k8s"

echo "Building local images (relative API URLs)..."
"${K8S_DIR}/build-images.sh"

echo "Applying Kubernetes manifests..."
kubectl apply -k "${K8S_DIR}"

echo "Waiting for workloads..."
kubectl -n freshcart rollout status deployment/server-net --timeout=180s || true
kubectl -n freshcart rollout status deployment/server-node --timeout=180s || true
kubectl -n freshcart rollout status deployment/app --timeout=180s || true

cat <<'EOF'

FreshCart applied to namespace "freshcart".

Useful commands:
  kubectl -n freshcart get pods,svc,ingress
  kubectl -n freshcart port-forward svc/app 5173:5173
  kubectl -n freshcart port-forward svc/server-net 5177:8080
  kubectl -n freshcart port-forward svc/server-node 5001:5000

If Ingress + nginx is installed and /etc/hosts has:
  127.0.0.1 freshcart.local
open http://freshcart.local

EOF
