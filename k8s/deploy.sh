#!/bin/bash

K8S_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
kubectl create namespace lanchonete
kubectl apply -f "$K8S_DIR/configmap.yaml" -n lanchonete
set -a ; . ./.env
kubectl create secret generic nodejs-app-secrets --from-literal=MONGODB_URL=${MONGODB_URL} -n lanchonete
kubectl apply -f "$K8S_DIR/deployment.yaml" -n lanchonete
kubectl apply -f "$K8S_DIR/service.yaml" -n lanchonete
kubectl apply -f "$K8S_DIR/hpa.yaml" -n lanchonete
