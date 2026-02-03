import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Navbar Component
 * Navigation bar with links to different pages
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        end
      >
        🏠 Home
      </NavLink>
      <NavLink 
        to="/trades" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        📊 Trades
      </NavLink>
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        📈 Dashboard
      </NavLink>
    </nav>
  );
};

export default Navbar;
