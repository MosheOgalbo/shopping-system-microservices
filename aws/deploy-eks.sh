#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AWS_REGION="${AWS_REGION:-eu-west-1}"
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID:-$(aws sts get-caller-identity --query Account --output text)}"
TAG="${IMAGE_TAG:-latest}"
REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
CLUSTER_NAME="${CLUSTER_NAME:-freshcart}"

echo "1) Push images to ECR"
"${ROOT_DIR}/aws/ecr-push.sh"

echo "2) Ensure kubeconfig for ${CLUSTER_NAME}"
aws eks update-kubeconfig --name "${CLUSTER_NAME}" --region "${AWS_REGION}"

echo "3) Apply base manifests with ECR image names"
kubectl apply -k "${ROOT_DIR}/k8s"
kubectl -n freshcart set image deployment/server-net "server-net=${REGISTRY}/freshcart/server-net:${TAG}"
kubectl -n freshcart set image deployment/server-node "server-node=${REGISTRY}/freshcart/server-node:${TAG}"
kubectl -n freshcart set image deployment/app "app=${REGISTRY}/freshcart/app:${TAG}"

# Prefer ALB ingress on EKS when AWS Load Balancer Controller is installed.
if kubectl get ingressclass alb >/dev/null 2>&1; then
  echo "4) Applying ALB Ingress"
  kubectl apply -f "${ROOT_DIR}/aws/ingress-alb.yaml"
  # Same-origin via ALB; wildcard only needed for odd cross-origin clients.
  kubectl -n freshcart patch configmap freshcart-config --type merge \
    -p '{"data":{"Cors__AllowedOrigins":"*","CORS_ORIGINS":"*"}}' || true
else
  echo "4) ALB IngressClass not found — keeping nginx ingress from k8s/ingress.yaml"
fi

echo "5) Rollout status"
kubectl -n freshcart rollout status deployment/app --timeout=300s || true
kubectl -n freshcart rollout status deployment/server-net --timeout=300s || true
kubectl -n freshcart rollout status deployment/server-node --timeout=300s || true

echo
kubectl -n freshcart get pods,svc,ingress
echo
echo "When ALB is ready:"
echo "  kubectl -n freshcart get ingress freshcart -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'"
echo
