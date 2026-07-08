import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Home from './pages/Home';
// Other pages will be created later based on details.md (Shop, About, Contact, Wishlist)

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Placeholders for future routes */}
          <Route path="/shop" element={<div style={{padding: '50px', textAlign: 'center'}}>Shop Page Coming Soon</div>} />
          <Route path="/about" element={<div style={{padding: '50px', textAlign: 'center'}}>About Page Coming Soon</div>} />
          <Route path="/contact" element={<div style={{padding: '50px', textAlign: 'center'}}>Contact Page Coming Soon</div>} />
          <Route path="/wishlist" element={<div style={{padding: '50px', textAlign: 'center'}}>Wishlist Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
