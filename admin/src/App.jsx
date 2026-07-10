import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import HomeCMS from './pages/cms/HomeCMS';
import Categories from './pages/categories/Categories';
import AddProduct from './pages/products/AddProduct';
import AllProducts from './pages/products/AllProducts';

import ProductOffers from './pages/offers/ProductOffers';
import WhatsAppSettings from './pages/settings/WhatsAppSettings';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Admin Dashboard Routes wrapped in Layout */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="cms/home" element={<HomeCMS />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<AddProduct />} />
          <Route path="offers" element={<ProductOffers />} />
          <Route path="settings/whatsapp" element={<WhatsAppSettings />} />
          {/* Add more nested routes for CMS, Products, etc. here later */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
