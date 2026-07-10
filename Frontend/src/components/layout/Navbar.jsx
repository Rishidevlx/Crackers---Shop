import React, { useState, useEffect } from 'react';
import { FiSearch, FiShoppingCart, FiMenu, FiHeart } from 'react-icons/fi';
import { FaBolt, FaStar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/logo-removebg-preview.png';
import CartSidebar from '../cart/CartSidebar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  const location = useLocation();
  const { wishlistCount } = useWishlist();
  const { cartCount, cartTotal } = useCart();
  
  // Dynamic Marquee
  const [marqueeText, setMarqueeText] = useState('🎉 HUGE DIWALI SALE IS LIVE! GET FLAT 50% DISCOUNT ON ALL CRACKERS 🔥');

  // Fetch all products for search
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/products');
        const data = await response.json();
        if (data.success) {
          setAllProducts(data.data.filter(p => p.status === 'active'));
        }
      } catch (err) {
        console.error('Failed to fetch products for search:', err);
      }
    };
    fetchProducts();
  }, []);

  // Handle Search Input
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(lowerCaseQuery) || 
        (p.category_name && p.category_name.toLowerCase().includes(lowerCaseQuery))
      ).slice(0, 5); // top 5 suggestions
      setSearchResults(filtered);
    }
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home');
        const data = await response.json();
        if (data.success && data.data.marquee_text) {
          setMarqueeText(data.data.marquee_text);
        }
      } catch (err) {
        console.error('Failed to fetch marquee:', err);
      }
    };
    fetchCMS();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Offers', path: '/offers', highlight: true },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <div className="fixed w-full z-50 top-0 left-0 flex flex-col font-body">
        {/* Top Bar (Marquee) */}
        <div className="bg-brand text-white text-xs font-semibold py-1.5 overflow-hidden hidden md:block border-b border-white/10">
          <div className="whitespace-nowrap flex items-center">
              <div className="inline-block animate-marquee hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, i) => (
                  <span key={i} className="mx-8 inline-flex items-center">
                  <FaBolt className="text-yellow-300 mr-2" />
                  {marqueeText}
                  </span>
              ))}
              </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="bg-white shadow-md transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              
              {/* Mobile Menu Button */}
              <div className="flex items-center lg:hidden">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-700 hover:text-brand focus:outline-none p-2"
                >
                  <FiMenu className="h-6 w-6" />
                </button>
              </div>

              {/* Logo */}
              <div className="flex-shrink-0 flex items-center justify-center lg:justify-start w-full lg:w-auto absolute lg:static left-0 pointer-events-none lg:pointer-events-auto">
                <Link to="/" className="flex items-center gap-2 pointer-events-auto">
                  <img src={logo} alt="AK Crackers" className="h-12 md:h-16 w-auto drop-shadow-sm hover:scale-105 transition-transform duration-300" />
                  <div className="hidden sm:block">
                    <h1 className="text-xl md:text-2xl font-heading font-extrabold text-brand tracking-wider uppercase leading-tight">
                      AK Crackers
                    </h1>
                    <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-widest uppercase">
                      Premium Quality
                    </p>
                  </div>
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex flex-1 justify-center px-2">
                <div className="flex space-x-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`px-3 xl:px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-1 ${
                        location.pathname === link.path 
                          ? 'bg-brand text-white shadow-md' 
                          : link.highlight
                            ? 'text-brand hover:bg-red-50'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-brand'
                      }`}
                    >
                      {link.highlight && <FaStar className="text-yellow-400 mb-0.5" />}
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Icons & Search */}
              <div className="flex items-center space-x-3 md:space-x-4 z-10">
                
                {/* Static Search Bar (Hidden on very small screens) */}
                <div className="hidden sm:block relative w-48 xl:w-56">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search crackers..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-4 pr-10 outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all text-sm font-medium text-gray-700 placeholder-gray-400 shadow-inner"
                    />
                    <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  
                  {/* Search Dropdown */}
                  {searchQuery.trim() !== '' && (
                    <div className="absolute right-0 top-full mt-2 w-72 lg:w-full bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.length > 0 ? (
                          <div className="py-2">
                            {searchResults.map(product => (
                              <Link 
                                key={product.id} 
                                to={`/product/${product.id}`}
                                onClick={() => setSearchQuery('')}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                              >
                                <img 
                                  src={product.main_image || 'https://via.placeholder.com/50'} 
                                  alt={product.name} 
                                  className="w-10 h-10 object-cover rounded shadow-sm border border-gray-100"
                                />
                                <div className="flex-1">
                                  <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{product.name}</h4>
                                  <p className="text-xs text-brand font-semibold">₹{Number(product.price || 0).toFixed(2)}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-sm text-gray-500 font-medium">
                            No products found.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Wishlist Icon */}
                <Link to="/wishlist" className="text-gray-700 hover:text-brand transition-colors relative group transition-transform duration-300 hover:scale-110">
                  <FiHeart className="h-5 w-5 md:h-6 md:w-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
                
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2 bg-brand/10 hover:bg-brand/20 px-3 py-2 rounded-lg transition-colors group cursor-pointer border-none outline-none"
                >
                  <div className="relative">
                    <FiShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-brand transition-transform duration-300 group-hover:scale-110" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-[10px] text-gray-500 font-semibold leading-none">Your Cart</span>
                    <span className="text-sm font-bold text-gray-800 leading-none mt-0.5">₹{cartTotal.toFixed(2)}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white border-t border-gray-100 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-4 pt-2 pb-4 space-y-1 shadow-inner">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-semibold ${
                    location.pathname === link.path 
                      ? 'bg-brand/10 text-brand border-l-4 border-brand' 
                      : link.highlight
                        ? 'text-brand'
                        : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Cart Sidebar Component */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
