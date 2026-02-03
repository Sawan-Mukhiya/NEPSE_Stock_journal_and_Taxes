import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 * Bottom footer with copyright, project info, and navigation links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>NEPSE Stock Journal & Taxes</p>
          <p>© {currentYear} Nepse Traders Pro. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/trades" className="footer-link">Trades</Link>
          <Link to="/dashboard" className="footer-link">Dashboard</Link>
          <a 
            href="https://www.nepalstock.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            NEPSE Official
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
