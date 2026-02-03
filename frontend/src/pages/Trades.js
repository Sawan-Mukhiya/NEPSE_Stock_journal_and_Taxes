import React, { useState, useEffect } from 'react';
import { getTrades } from '../services/api';

/**
 * Trades Component
 * Displays a list of all trades fetched from the backend API
 */
const Trades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for development (until backend is connected)
  const mockTrades = [
    {
      id: 1,
      symbol: 'NABIL',
      trade_type: 'BUY',
      quantity: 50,
      price: 1250.00,
      buy_price: null,
      broker_commission: 225.00,
      sebon_fee: 9.38,
      dp_charge: 25.00,
      capital_gain_tax: 0.00,
      gross_amount: 62500.00,
      net_amount: 62240.62,
      created_at: '2026-01-28T10:30:00Z',
    },
    {
      id: 2,
      symbol: 'NICA',
      trade_type: 'BUY',
      quantity: 100,
      price: 850.00,
      buy_price: null,
      broker_commission: 306.00,
      sebon_fee: 12.75,
      dp_charge: 25.00,
      capital_gain_tax: 0.00,
      gross_amount: 85000.00,
      net_amount: 84656.25,
      created_at: '2026-01-27T14:15:00Z',
    },
    {
      id: 3,
      symbol: 'NABIL',
      trade_type: 'SELL',
      quantity: 50,
      price: 1320.00,
      buy_price: 1250.00,
      broker_commission: 237.60,
      sebon_fee: 9.90,
      dp_charge: 25.00,
      capital_gain_tax: 262.50,
      gross_amount: 66000.00,
      net_amount: 65465.00,
      created_at: '2026-01-30T11:45:00Z',
    },
    {
      id: 4,
      symbol: 'GBIME',
      trade_type: 'BUY',
      quantity: 75,
      price: 520.00,
      buy_price: null,
      broker_commission: 140.40,
      sebon_fee: 5.85,
      dp_charge: 25.00,
      capital_gain_tax: 0.00,
      gross_amount: 39000.00,
      net_amount: 38828.75,
      created_at: '2026-01-26T09:20:00Z',
    },
    {
      id: 5,
      symbol: 'HIDCL',
      trade_type: 'BUY',
      quantity: 200,
      price: 380.00,
      buy_price: null,
      broker_commission: 273.60,
      sebon_fee: 11.40,
      dp_charge: 25.00,
      capital_gain_tax: 0.00,
      gross_amount: 76000.00,
      net_amount: 75690.00,
      created_at: '2026-01-25T16:00:00Z',
    },
  ];

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      setLoading(true);
      // Try to fetch from backend
      const data = await getTrades();
      setTrades(data);
      setError(null);
    } catch (err) {
      // If backend is not available, use mock data
      console.log('Backend not available, using mock data');
      setTrades(mockTrades);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount) => {
    return `NPR ${parseFloat(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="card-header">
        <h2 className="card-title">📊 Trading History</h2>
        <button className="btn btn-primary" onClick={fetchTrades}>
          🔄 Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="card" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'var(--error)', marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--error)', margin: 0 }}>⚠️ {error}</p>
        </div>
      )}

      {/* Stats Summary */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-label">Total Trades</div>
              <div className="stat-value">{trades.length}</div>
            </div>
            <div className="stat-icon primary">📊</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-label">Buy Orders</div>
              <div className="stat-value">
                {trades.filter(t => t.trade_type === 'BUY').length}
              </div>
            </div>
            <div className="stat-icon success">📈</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-label">Sell Orders</div>
              <div className="stat-value">
                {trades.filter(t => t.trade_type === 'SELL').length}
              </div>
            </div>
            <div className="stat-icon warning">📉</div>
          </div>
        </div>
      </div>

      {/* Trades Table */}
      {trades.length === 0 ? (
        <div className="card text-center">
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', margin: '2rem 0' }}>
            No trades found. Start by adding your first trade!
          </p>
          <button className="btn btn-primary">➕ Add Trade</button>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Symbol</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Gross Amount</th>
                <th>Broker Fee</th>
                <th>SEBON Fee</th>
                <th>DP Charge</th>
                <th>CGT</th>
                <th>Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id}>
                  <td>{formatDate(trade.created_at)}</td>
                  <td style={{ fontWeight: 600, color: 'var(--primary-color)' }}>
                    {trade.symbol}
                  </td>
                  <td>
                    <span className={`badge badge-${trade.trade_type.toLowerCase()}`}>
                      {trade.trade_type}
                    </span>
                  </td>
                  <td>{trade.quantity}</td>
                  <td>{formatCurrency(trade.price)}</td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(trade.gross_amount)}</td>
                  <td>{formatCurrency(trade.broker_commission)}</td>
                  <td>{formatCurrency(trade.sebon_fee)}</td>
                  <td>{formatCurrency(trade.dp_charge)}</td>
                  <td>{formatCurrency(trade.capital_gain_tax)}</td>
                  <td style={{ fontWeight: 700, color: 'var(--primary-color)' }}>
                    {formatCurrency(trade.net_amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Trades;
