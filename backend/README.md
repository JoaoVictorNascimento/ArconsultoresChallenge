# Backend - Transactions API

Backend criado com Node.js e Express para gerenciar transações.

## Instalação

```bash
npm install
```

## Executar

### Modo de desenvolvimento (com auto-reload)
```bash
npm run dev
```

### Modo de produção
```bash
npm start
```

O servidor irá iniciar em `http://localhost:5000`

## Rotas da API

### 1. Health Check
```
GET /health
```

Resposta:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 2. Criar uma transação
```
POST /api/transactions
```

Body:
```json
{
  "value": 100.50,
  "description": "Descrição da transação"
}
```

Resposta de sucesso (201):
```json
{
  "message": "Transaction created successfully",
  "transaction": {
    "id": 1,
    "value": 100.50,
    "description": "Descrição da transação",
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 3. Buscar todas as transações
```
GET /api/transactions
```

Resposta:
```json
{
  "total": 2,
  "transactions": [
    {
      "id": 1,
      "value": 100.50,
      "description": "Descrição da transação",
      "createdAt": "2024-01-01T12:00:00.000Z"
    },
    {
      "id": 2,
      "value": 250.00,
      "description": "Outra transação",
      "createdAt": "2024-01-01T12:05:00.000Z"
    }
  ]
}
```

### 4. Buscar uma transação específica
```
GET /api/transactions/:id
```

Resposta:
```json
{
  "id": 1,
  "value": 100.50,
  "description": "Descrição da transação",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

### 5. Deletar uma transação
```
DELETE /api/transactions/:id
```

Resposta:
```json
{
  "message": "Transaction deleted successfully",
  "transaction": {
    "id": 1,
    "value": 100.50,
    "description": "Descrição da transação",
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

## Validações

- **value**: Obrigatório e deve ser um número
- **description**: Obrigatório e não pode ser vazio

## Armazenamento

Os dados são armazenados em memória (array). Quando o servidor reinicia, todos os dados são perdidos.
