import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound Component
 * 404 error page with friendly message and navigation back to home
 */
const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-message">Oops! Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1rem' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">
          🏠 Go Home
        </Link>
        <Link to="/trades" className="btn btn-secondary">
          📊 View Trades
        </Link>
      </div>
      
      {/* Decorative illustration */}
      <div style={{ marginTop: '3rem', fontSize: '4rem', opacity: 0.3 }}>
        📉📊📈
      </div>
    </div>
  );
};

export default NotFound;
