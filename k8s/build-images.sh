#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TAG="${IMAGE_TAG:-latest}"
REGISTRY="${IMAGE_REGISTRY:-freshcart}"

echo "Building images into ${REGISTRY}/*:${TAG}"

docker build \
  -t "${REGISTRY}/server-net:${TAG}" \
  "${ROOT_DIR}/server-net"

docker build \
  -t "${REGISTRY}/server-node:${TAG}" \
  "${ROOT_DIR}/server-node"

# Same-origin API paths for Ingress (/api/* on one host).
docker build \
  --build-arg VITE_API_PRODUCTS=/api/ \
  --build-arg VITE_API_ORDERS=/api/ \
  -t "${REGISTRY}/app:${TAG}" \
  "${ROOT_DIR}/shopping-client"

echo "Done."
echo "  ${REGISTRY}/server-net:${TAG}"
echo "  ${REGISTRY}/server-node:${TAG}"
echo "  ${REGISTRY}/app:${TAG}"
