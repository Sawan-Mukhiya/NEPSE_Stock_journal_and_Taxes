import axios from 'axios';

// Configure axios instance with base URL
// Update this URL to match your Django backend when it's running
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Django backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for adding auth tokens if needed in future
api.interceptors.request.use(
  (config) => {
    // You can add authorization headers here later
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ==================== API FUNCTIONS ====================

/**
 * Fetch all trades from the backend
 * @returns {Promise} - List of all trades
 */
export const getTrades = async () => {
  try {
    const response = await api.get('/trades/');
    return response.data;
  } catch (error) {
    console.error('Error fetching trades:', error);
    throw error;
  }
};

/**
 * Fetch a single trade by ID
 * @param {number} id - Trade ID
 * @returns {Promise} - Trade details
 */
export const getTradeById = async (id) => {
  try {
    const response = await api.get(`/trades/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching trade ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new trade
 * @param {Object} tradeData - Trade information
 * @returns {Promise} - Created trade
 */
export const addTrade = async (tradeData) => {
  try {
    const response = await api.post('/trades/', tradeData);
    return response.data;
  } catch (error) {
    console.error('Error adding trade:', error);
    throw error;
  }
};

/**
 * Update an existing trade
 * @param {number} id - Trade ID
 * @param {Object} tradeData - Updated trade data
 * @returns {Promise} - Updated trade
 */
export const updateTrade = async (id, tradeData) => {
  try {
    const response = await api.put(`/trades/${id}/`, tradeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating trade ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a trade
 * @param {number} id - Trade ID
 * @returns {Promise}
 */
export const deleteTrade = async (id) => {
  try {
    const response = await api.delete(`/trades/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting trade ${id}:`, error);
    throw error;
  }
};

/**
 * Calculate trade before saving (preview calculation)
 * @param {Object} calculationData - Calculation parameters
 * @returns {Promise} - Calculation results
 */
export const calculateTrade = async (calculationData) => {
  try {
    const response = await api.post('/calculator/', calculationData);
    return response.data;
  } catch (error) {
    console.error('Error calculating trade:', error);
    throw error;
  }
};

/**
 * Get dashboard statistics
 * @returns {Promise} - Dashboard stats
 */
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats/');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// Export axios instance for custom requests if needed
export default api;