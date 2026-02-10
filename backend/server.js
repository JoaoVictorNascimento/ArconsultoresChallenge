const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
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

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Transactions API available at http://localhost:${PORT}/api/transactions`);
});
