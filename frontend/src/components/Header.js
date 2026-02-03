import React from 'react';
import Navbar from './Navbar';

/**
 * Header Component
 * Top navigation bar with app title, logo, and navigation links
 */
const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <div className="logo-icon">📈</div>
          <div className="logo-text">
            <h1>NEPSE Stock Journal</h1>
            <p>Track Trades • Calculate Taxes • Analyze Performance</p>
          </div>
        </div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
