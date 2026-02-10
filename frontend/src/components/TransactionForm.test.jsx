import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TransactionForm from './TransactionForm';
import * as transactionService from '../services/transactionService';

jest.mock('../services/transactionService');

global.alert = jest.fn();

describe('TransactionForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render form fields correctly', () => {
    render(<TransactionForm />);

    expect(screen.getByPlaceholderText(/0.00/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter a description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('should show validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    render(<TransactionForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/value is required/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
  });

  test('should send correct data to createTransaction service', async () => {
    const user = userEvent.setup();
    
    const mockCreatedTransaction = {
      message: 'Transaction created successfully',
      transaction: {
        id: 1,
        value: 100.50,
        description: 'Test transaction',
        createdAt: '2024-01-01T12:00:00.000Z'
      }
    };

    const mockFetchedTransaction = {
      id: 1,
      value: 100.50,
      description: 'Test transaction',
      createdAt: '2024-01-01T12:00:00.000Z'
    };

    transactionService.createTransaction.mockResolvedValue(mockCreatedTransaction);
    transactionService.getTransactionById.mockResolvedValue(mockFetchedTransaction);

    render(<TransactionForm />);

    const valueInput = screen.getByPlaceholderText(/0.00/i);
    const descriptionInput = screen.getByPlaceholderText(/enter a description/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(valueInput, '100.50');
    await user.type(descriptionInput, 'Test transaction');
    await user.click(submitButton);

    await waitFor(() => {
      expect(transactionService.createTransaction).toHaveBeenCalledWith({
        value: 100.50,
        description: 'Test transaction'
      });
    });

    expect(transactionService.getTransactionById).toHaveBeenCalledWith(1);
    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining('Transaction Created Successfully!')
    );
  });

  test('should show error message when API request fails', async () => {
    const user = userEvent.setup();
    
    transactionService.createTransaction.mockRejectedValue(
      new Error('Failed to create transaction')
    );

    render(<TransactionForm />);

    const valueInput = screen.getByPlaceholderText(/0.00/i);
    const descriptionInput = screen.getByPlaceholderText(/enter a description/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(valueInput, '100');
    await user.type(descriptionInput, 'Test transaction');
    await user.click(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Error: Failed to create transaction');
    });
  });
});
