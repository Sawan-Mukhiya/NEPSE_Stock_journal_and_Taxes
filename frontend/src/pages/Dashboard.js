import React, { useState, useEffect } from 'react';
import { getTrades } from '../services/api';

/**
 * Dashboard Component
 * Analytics dashboard with statistics and chart placeholders
 */
const Dashboard = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTrades: 0,
    totalBuys: 0,
    totalSells: 0,
    totalInvested: 0,
    totalRealized: 0,
    totalProfit: 0,
    totalTaxesPaid: 0,
    totalFeesPaid: 0,
  });

  // Mock data for development
  const mockTrades = [
    {
      id: 1,
      symbol: 'NABIL',
      trade_type: 'BUY',
      quantity: 50,
      price: 1250.00,
      gross_amount: 62500.00,
      net_amount: 62240.62,
      broker_commission: 225.00,
      sebon_fee: 9.38,
      dp_charge: 25.00,
      capital_gain_tax: 0.00,
    },
    {
      id: 2,
      symbol: 'NABIL',
      trade_type: 'SELL',
      quantity: 50,
      price: 1320.00,
      gross_amount: 66000.00,
      net_amount: 65465.00,
      broker_commission: 237.60,
      sebon_fee: 9.90,
      dp_charge: 25.00,
      capital_gain_tax: 262.50,
    },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getTrades();
      setTrades(data);
      calculateStats(data);
    } catch (err) {
      console.log('Backend not available, using mock data');
      setTrades(mockTrades);
      calculateStats(mockTrades);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (tradesData) => {
    const buys = tradesData.filter(t => t.trade_type === 'BUY');
    const sells = tradesData.filter(t => t.trade_type === 'SELL');

    const totalInvested = buys.reduce((sum, t) => sum + parseFloat(t.net_amount || 0), 0);
    const totalRealized = sells.reduce((sum, t) => sum + parseFloat(t.net_amount || 0), 0);
    const totalTaxesPaid = tradesData.reduce((sum, t) => sum + parseFloat(t.capital_gain_tax || 0), 0);
    const totalFeesPaid = tradesData.reduce((sum, t) => 
      sum + parseFloat(t.broker_commission || 0) + 
      parseFloat(t.sebon_fee || 0) + 
      parseFloat(t.dp_charge || 0), 0
    );

    setStats({
      totalTrades: tradesData.length,
      totalBuys: buys.length,
      totalSells: sells.length,
      totalInvested,
      totalRealized,
      totalProfit: totalRealized - totalInvested,
      totalTaxesPaid,
      totalFeesPaid,
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
        <h2 className="card-title">📈 Trading Dashboard</h2>
        <button className="btn btn-primary" onClick={fetchDashboardData}>
          🔄 Refresh
        </button>
      </div>

      {/* Key Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-label">Total Trades</div>
              <div className="stat-value">{stats.totalTrades}</div>
              <div className="stat-change">
                {stats.totalBuys} Buys • {stats.totalSells} Sells
              </div>
            </div>
            <div className="stat-icon primary">📊</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-label">Total Invested</div>
              <div className="stat-value" style={{ fontSize: '1.5rem' }}>
                {formatCurrency(stats.totalInvested)}
              </div>
              <div className="stat-change positive">
                {stats.totalBuys} Buy Orders
              </div>
            </div>
            <div className="stat-icon success">💰</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-label">Total Realized</div>
              <div className="stat-value" style={{ fontSize: '1.5rem' }}>
                {formatCurrency(stats.totalRealized)}
              </div>
              <div className="stat-change positive">
                {stats.totalSells} Sell Orders
              </div>
            </div>
            <div className="stat-icon warning">📈</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-label">Net Profit/Loss</div>
              <div 
                className="stat-value" 
                style={{ 
                  fontSize: '1.5rem',
                  color: stats.totalProfit >= 0 ? 'var(--success)' : 'var(--error)' 
                }}
              >
                {formatCurrency(Math.abs(stats.totalProfit))}
              </div>
              <div className={stats.totalProfit >= 0 ? 'stat-change positive' : 'stat-change negative'}>
                {stats.totalProfit >= 0 ? '↑ Profit' : '↓ Loss'}
              </div>
            </div>
            <div className="stat-icon success">🎯</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-label">Total Taxes Paid</div>
              <div className="stat-value" style={{ fontSize: '1.5rem' }}>
                {formatCurrency(stats.totalTaxesPaid)}
              </div>
              <div className="stat-change">Capital Gain Tax</div>
            </div>
            <div className="stat-icon warning">🏛️</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-label">Total Fees Paid</div>
              <div className="stat-value" style={{ fontSize: '1.5rem' }}>
                {formatCurrency(stats.totalFeesPaid)}
              </div>
              <div className="stat-change">Broker + SEBON + DP</div>
            </div>
            <div className="stat-icon primary">💳</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="chart-container">
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
          📊 Trading Volume Over Time
        </h3>
        <div className="chart-placeholder">
          Chart visualization will be integrated here
          <br />
          <small style={{ marginTop: '0.5rem', display: 'block' }}>
            (Use libraries like Chart.js, Recharts, or D3.js)
          </small>
        </div>
      </div>

      <div className="chart-container">
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
          💰 Profit/Loss Distribution
        </h3>
        <div className="chart-placeholder">
          Profit and loss pie chart will be displayed here
          <br />
          <small style={{ marginTop: '0.5rem', display: 'block' }}>
            (Use libraries like Chart.js, Recharts, or D3.js)
          </small>
        </div>
      </div>

      <div className="chart-container">
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
          📈 Portfolio Performance
        </h3>
        <div className="chart-placeholder">
          Portfolio growth line chart will be rendered here
          <br />
          <small style={{ marginTop: '0.5rem', display: 'block' }}>
            (Use libraries like Chart.js, Recharts, or D3.js)
          </small>
        </div>
      </div>

      {/* Top Performers */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🏆 Top Trading Symbols</h3>
        </div>
        <div>
          {trades.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[...new Set(trades.map(t => t.symbol))].slice(0, 6).map((symbol, index) => {
                const symbolTrades = trades.filter(t => t.symbol === symbol);
                const totalVolume = symbolTrades.reduce((sum, t) => sum + t.quantity, 0);
                
                return (
                  <div 
                    key={index} 
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                      {symbol}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      {symbolTrades.length} trades • {totalVolume} shares
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
              No trading data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
