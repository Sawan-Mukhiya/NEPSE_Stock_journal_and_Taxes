import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Trades from './pages/Trades';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import './styles/main.css';

/**
 * App Component
 * Root component with routing, header, footer, and overall layout
 */
function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header with navigation */}
        <Header />
        
        {/* Main content area */}
        <main className="main-content">
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<Home />} />
            
            {/* Trades page route */}
            <Route path="/trades" element={<Trades />} />
            
            {/* Dashboard page route */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* 404 Not Found page - catches all undefined routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;