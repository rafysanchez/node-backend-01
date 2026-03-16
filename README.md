# Node.js Backend API (Clean Architecture)

Este projeto é um exemplo de backend robusto utilizando **Hexagonal Architecture** (Ports and Adapters) com Next.js.

## Estrutura de Pastas

```text
/src
  /core
    /domain          # Entidades e regras de negócio puras
    /application     # Casos de uso e definições de portas (interfaces)
  /infrastructure
    /adapters        # Implementações de repositórios e serviços externos
    /config          # Injeção de dependência e configurações
/app
  /api               # Adaptadores de entrada (HTTP/Web)
  /docs              # Documentação Swagger
```

## Tecnologias

- **Next.js 15+** (App Router)
- **TypeScript**
- **Bootstrap 5** (Interface)
- **JWT** (Autenticação)
- **Zod** (Validação)
- **Swagger** (Documentação)
- **Docker** & **Kubernetes**

## 🐳 Docker (Desenvolvimento e Produção)

O projeto utiliza **Multi-stage builds** para garantir imagens leves e seguras.

### Rodar localmente com Docker Compose:
```bash
docker-compose up --build
```
A aplicação estará disponível em `http://localhost:3000`.

---

## ☸️ Kubernetes (Melhores Práticas)

O projeto está preparado para deploy em clusters Kubernetes seguindo padrões de produção:

### 1. Funcionalidades Implementadas:
- **Standalone Mode**: Otimizado para rodar com o mínimo de recursos.
- **Health Checks**: Endpoint `/api/health` configurado para *Liveness* e *Readiness* probes.
- **Segurança**: Dockerfile configurado para rodar como usuário não-root.
- **Resource Limits**: Definições de CPU e Memória recomendadas no manifesto.

### 2. Como fazer o Deploy:

1. **Crie os Segredos:**
   Edite o arquivo `k8s/secrets.yaml` com sua chave JWT e aplique:
   ```bash
   kubectl apply -f k8s/secrets.yaml
   ```

2. **Aplique o Deployment e Service:**
   ```bash
   kubectl apply -f k8s/deployment.yaml
   ```

3. **Verifique o Status:**
   ```bash
   kubectl get pods
   kubectl get services
   ```

---

## 🛠️ Endpoints Úteis

- **Frontend/Dashboard:** `/`
- **Documentação API (Swagger):** `/docs`
- **Health Check (K8s):** `/api/health`

## Autenticação (Padrão)

- **User:** `admin@example.com`
- **Pass:** `password123`
