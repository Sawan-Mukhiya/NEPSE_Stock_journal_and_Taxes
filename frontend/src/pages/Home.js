import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home Component
 * Landing page with welcome message, overview, and key features
 */
const Home = () => {
  const features = [
    {
      icon: '📊',
      title: 'Trade Tracking',
      description: 'Record and monitor all your NEPSE stock trades in one centralized location. Keep track of buy and sell transactions with detailed information.',
    },
    {
      icon: '💰',
      title: 'Tax Calculator',
      description: 'Automatically calculate broker commissions, SEBON fees, DP charges, and capital gain taxes based on Nepal Stock Exchange regulations.',
    },
    {
      icon: '📈',
      title: 'Performance Analytics',
      description: 'Visualize your trading performance with comprehensive charts and statistics. Analyze your portfolio growth and trading patterns.',
    },
    {
      icon: '📝',
      title: 'Trading Journal',
      description: 'Maintain a detailed journal of all your stock transactions. Review your trading history and make informed decisions for future trades.',
    },
    {
      icon: '🎯',
      title: 'Profit & Loss',
      description: 'Track your realized and unrealized gains and losses. Get clear insights into your overall trading performance and profitability.',
    },
    {
      icon: '🔒',
      title: 'Secure & Reliable',
      description: 'Your trading data is stored securely with robust backend infrastructure. Access your portfolio anytime, anywhere with confidence.',
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome to NEPSE Stock Journal</h1>
        <p>
          Your comprehensive solution for tracking stock trades, calculating taxes, and analyzing 
          your investment performance on the Nepal Stock Exchange. Make informed trading decisions 
          with powerful analytics and accurate tax calculations.
        </p>
        <div className="welcome-actions">
          <Link to="/trades" className="btn btn-primary">
            📊 View Trades
          </Link>
          <Link to="/dashboard" className="btn btn-secondary">
            📈 Open Dashboard
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section className="card mt-3">
        <div className="card-header">
          <h2 className="card-title">About This Application</h2>
        </div>
        <div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
            NEPSE Stock Journal & Taxes is a full-stack web application designed specifically for 
            traders and investors in the Nepal Stock Exchange. Our platform helps you maintain 
            accurate records of your stock transactions while automatically calculating all 
            associated fees and taxes.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
            Built with Django REST Framework on the backend and React on the frontend, this 
            application provides a seamless experience for managing your investment portfolio. 
            Whether you're a day trader or a long-term investor, our tools help you stay 
            organized and make data-driven decisions.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            Key calculations include broker commission (0.36%), SEBON regulatory fee (0.015%), 
            DP charges (NPR 25), and capital gain tax (7.5% on profits). All calculations follow 
            the latest NEPSE and SEBON guidelines to ensure accuracy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
