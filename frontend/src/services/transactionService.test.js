import { createTransaction, getTransactionById } from './transactionService';
import { API_ENDPOINTS } from '../config/api';

global.fetch = jest.fn();

describe('transactionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTransaction', () => {
    test('should send POST request with correct data and headers', async () => {
      const mockResponse = {
        message: 'Transaction created successfully',
        transaction: {
          id: 1,
          value: 100.50,
          description: 'Test transaction',
          createdAt: '2024-01-01T12:00:00.000Z',
        },
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const transactionData = {
        value: 100.50,
        description: 'Test transaction',
      };

      const result = await createTransaction(transactionData);

      expect(global.fetch).toHaveBeenCalledWith(
        API_ENDPOINTS.transactions,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transactionData),
        }
      );

      expect(result).toEqual(mockResponse);
    });

    test('should throw error when response is not ok', async () => {
      const mockError = { error: 'Value is required' };

      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockError,
      });

      await expect(
        createTransaction({ value: 0, description: 'Test' })
      ).rejects.toThrow('Value is required');
    });
  });

  describe('getTransactionById', () => {
    test('should send GET request to correct endpoint', async () => {
      const mockTransaction = {
        id: 1,
        value: 100.50,
        description: 'Test transaction',
        createdAt: '2024-01-01T12:00:00.000Z',
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTransaction,
      });

      const result = await getTransactionById(1);

      expect(global.fetch).toHaveBeenCalledWith(`${API_ENDPOINTS.transactions}/1`);
      expect(result).toEqual(mockTransaction);
    });

    test('should throw error when transaction is not found', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Transaction not found' }),
      });

      await expect(getTransactionById(999)).rejects.toThrow('Failed to fetch transaction');
    });
  });
});
