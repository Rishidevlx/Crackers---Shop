import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp.jsx';
import FloatingCall from './components/layout/FloatingCall.jsx';
import FloatingGift from './components/layout/FloatingGift.jsx';
import FloatingLocation from './components/layout/FloatingLocation.jsx';
import FloatingPricelist from './components/layout/FloatingPricelist.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import FloatingOrderBar from './components/shop/FloatingOrderBar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import { Toaster } from 'react-hot-toast';


import About from './pages/About';
import Contact from './pages/Contact';
import Offers from './pages/Offers';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <FloatingWhatsApp />
        <FloatingCall />
        <FloatingGift />
        <FloatingLocation />
        <FloatingPricelist />
        <FloatingOrderBar />
        <Routes>
          <Route path="/" element={<Navigate to="/shop" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
