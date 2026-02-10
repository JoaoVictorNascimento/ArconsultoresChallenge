const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

let transactions = [];
let nextId = 1;

app.post('/api/transactions', (req, res) => {
  try {
    const { value, description } = req.body;

    if (value === undefined || value === null) {
      return res.status(400).json({ 
        error: 'Value is required' 
      });
    }

    if (!description || description.trim() === '') {
      return res.status(400).json({ 
        error: 'Description is required' 
      });
    }

    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      return res.status(400).json({ 
        error: 'Value must be a number' 
      });
    }

    const newTransaction = {
      id: nextId++,
      value: numericValue,
      description: description.trim(),
      createdAt: new Date().toISOString()
    };

    transactions.push(newTransaction);

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction: newTransaction
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Rota GET - Buscar todas as transações
app.get('/api/transactions', (req, res) => {
  try {
    res.status(200).json({
      total: transactions.length,
      transactions: transactions
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Rota GET - Buscar uma transação específica por ID
app.get('/api/transactions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const transaction = transactions.find(t => t.id === parseInt(id));

    if (!transaction) {
      return res.status(404).json({ 
        error: 'Transaction not found' 
      });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Rota DELETE - Deletar uma transação
app.delete('/api/transactions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = transactions.findIndex(t => t.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ 
        error: 'Transaction not found' 
      });
    }

    const deletedTransaction = transactions.splice(index, 1)[0];

    res.status(200).json({
      message: 'Transaction deleted successfully',
      transaction: deletedTransaction
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Server is running' 
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Transactions API available at http://localhost:${PORT}/api/transactions`);
  console.log(`✅ CORS enabled for http://localhost:3000`);
});
