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
  const location = useLocation();
  const { wishlistCount } = useWishlist();
  const { cartCount, cartTotal } = useCart();
  
  // Dynamic Marquee
  const [marqueeText, setMarqueeText] = useState('🎉 HUGE DIWALI SALE IS LIVE! GET FLAT 50% DISCOUNT ON ALL CRACKERS 🔥');

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cms/home');
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
    { name: 'Pricelist', path: '/pricelist' },
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
              <div className="hidden lg:flex flex-1 justify-center px-8">
                <div className="flex space-x-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-1 ${
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

              {/* Right Icons */}
              <div className="flex items-center space-x-4 md:space-x-6 z-10">
                <button className="text-gray-700 hover:text-brand transition-colors hidden sm:block">
                  <FiSearch className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                
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
