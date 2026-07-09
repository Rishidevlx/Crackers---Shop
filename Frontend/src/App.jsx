import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import { Toaster } from 'react-hot-toast';
// Other pages will be created later based on details.md (About, Contact)

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <FloatingWhatsApp />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<div style={{padding: '50px', textAlign: 'center'}}>About Page Coming Soon</div>} />
          <Route path="/contact" element={<div style={{padding: '50px', textAlign: 'center'}}>Contact Page Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
