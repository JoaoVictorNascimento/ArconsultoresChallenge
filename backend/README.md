# Backend - Transactions API

Backend built with Node.js and Express to manage transactions.

## Installation

```bash
npm install
```

## Running

### Development mode (with auto-reload)
```bash
npm run dev
```

### Production mode
```bash
npm start
```

The server will start on `http://localhost:5001`

## API Routes

### 1. Health Check
```
GET /health
```

Response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 2. Create a transaction
```
POST /api/transactions
```

Body:
```json
{
  "value": 100.50,
  "description": "Transaction description"
}
```

Success response (201):
```json
{
  "message": "Transaction created successfully",
  "transaction": {
    "id": 1,
    "value": 100.50,
    "description": "Transaction description",
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 3. Get all transactions
```
GET /api/transactions
```

Response:
```json
{
  "total": 2,
  "transactions": [
    {
      "id": 1,
      "value": 100.50,
      "description": "Transaction description",
      "createdAt": "2024-01-01T12:00:00.000Z"
    },
    {
      "id": 2,
      "value": 250.00,
      "description": "Another transaction",
      "createdAt": "2024-01-01T12:05:00.000Z"
    }
  ]
}
```

### 4. Get a specific transaction
```
GET /api/transactions/:id
```

Response:
```json
{
  "id": 1,
  "value": 100.50,
  "description": "Transaction description",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

### 5. Delete a transaction
```
DELETE /api/transactions/:id
```

Response:
```json
{
  "message": "Transaction deleted successfully",
  "transaction": {
    "id": 1,
    "value": 100.50,
    "description": "Transaction description",
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

## Validations

- **value**: Required and must be a number
- **description**: Required and cannot be empty

## Storage

Data is stored in memory (array). When the server restarts, all data is lost.
