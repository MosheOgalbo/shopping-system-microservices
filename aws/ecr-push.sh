#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AWS_REGION="${AWS_REGION:-eu-west-1}"
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID:-$(aws sts get-caller-identity --query Account --output text)}"
TAG="${IMAGE_TAG:-latest}"
REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

SERVICES=(server-net server-node app)

echo "Account=${AWS_ACCOUNT_ID} Region=${AWS_REGION}"
aws ecr get-login-password --region "${AWS_REGION}" \
  | docker login --username AWS --password-stdin "${REGISTRY}"

for service in "${SERVICES[@]}"; do
  repo="freshcart/${service}"
  aws ecr describe-repositories --repository-names "${repo}" --region "${AWS_REGION}" >/dev/null 2>&1 \
    || aws ecr create-repository --repository-name "${repo}" --region "${AWS_REGION}" >/dev/null
done

docker build -t "${REGISTRY}/freshcart/server-net:${TAG}" "${ROOT_DIR}/server-net"
docker build -t "${REGISTRY}/freshcart/server-node:${TAG}" "${ROOT_DIR}/server-node"
docker build \
  --build-arg VITE_API_PRODUCTS=/api/ \
  --build-arg VITE_API_ORDERS=/api/ \
  -t "${REGISTRY}/freshcart/app:${TAG}" \
  "${ROOT_DIR}/shopping-client"

for service in "${SERVICES[@]}"; do
  docker push "${REGISTRY}/freshcart/${service}:${TAG}"
done

echo "Pushed:"
for service in "${SERVICES[@]}"; do
  echo "  ${REGISTRY}/freshcart/${service}:${TAG}"
done
