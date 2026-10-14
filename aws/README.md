# AWS (ECR + EKS)

Deploy FreshCart to Amazon EKS with images in Amazon ECR.

## Prerequisites

- AWS CLI configured (`aws sts get-caller-identity`)
- Docker
- `kubectl`
- [`eksctl`](https://eksctl.io/)
- IAM permissions for EKS, ECR, EC2, IAM, ELB

Estimated cost: a small EKS cluster with `t3.xlarge` nodes is not free. Destroy when done.

## 1) Create the cluster

```bash
eksctl create cluster -f aws/eksctl-cluster.yaml
```

## 2) Install AWS Load Balancer Controller

Follow Amazon’s guide for your account/region, then verify:

```bash
kubectl get ingressclass alb
```

Without ALB controller, you can still use nginx Ingress from `k8s/ingress.yaml`.

## 3) Push images and deploy

```bash
chmod +x aws/*.sh k8s/*.sh
export AWS_REGION=eu-west-1
./aws/deploy-eks.sh
```

What it does:

1. Creates ECR repos `freshcart/server-net`, `freshcart/server-node`, `freshcart/app`
2. Builds & pushes images (UI uses relative `/api/` URLs)
3. Applies `k8s/` manifests
4. Points Deployments at ECR image URIs
5. Applies `aws/ingress-alb.yaml` when `IngressClass alb` exists

## 4) Open the app

```bash
kubectl -n freshcart get ingress freshcart
# ADDRESS column = ALB DNS name
```

Browse `http://<alb-dns>/`.

## Useful commands

```bash
# Logs
kubectl -n freshcart logs deploy/server-net -f
kubectl -n freshcart logs deploy/server-node -f

# Restart after a new push
IMAGE_TAG=v2 ./aws/deploy-eks.sh

# Tear down cluster (destructive)
eksctl delete cluster -f aws/eksctl-cluster.yaml
```

## Architecture on AWS

```
Internet → ALB Ingress
             ├─ /api/orders      → server-node (Express + MongoDB)
             ├─ /api/Products    → server-net  (.NET + SQL Server)
             ├─ /api/Categories  → server-net
             └─ /                → app (React static)
```

MongoDB and SQL Server run in-cluster for the homework demo. For production you would typically move them to Amazon RDS / DocumentDB / Atlas and store secrets in AWS Secrets Manager.
