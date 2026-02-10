import { API_ENDPOINTS } from "../config/api";

/**
 * Create a new transaction
 * @param {Object} transactionData - Transaction data
 * @param {number} transactionData.value - Transaction value
 * @param {string} transactionData.description - Transaction description
 * @returns {Promise<Object>} Created transaction
 */
export const createTransaction = async (transactionData) => {
  const response = await fetch(API_ENDPOINTS.transactions, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactionData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create transaction");
  }

  return await response.json();
};

/**
 * Get a transaction by ID
 * @param {number} id - Transaction ID
 * @returns {Promise<Object>} Transaction data
 */
export const getTransactionById = async (id) => {
  const response = await fetch(`${API_ENDPOINTS.transactions}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch transaction");
  }

  return await response.json();
};
