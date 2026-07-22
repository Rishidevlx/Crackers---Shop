import React, { useState, useEffect } from 'react';
import { FiSearch, FiShoppingCart, FiMenu, FiHeart } from 'react-icons/fi';
import { FaBolt, FaStar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';

import logo from '../../assets/logo-removebg-preview.png';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const location = useLocation();
  const { wishlistCount } = useWishlist();

  
  const [marqueeText, setMarqueeText] = useState('🎉 HUGE DIWALI SALE IS LIVE! GET FLAT 50% DISCOUNT ON ALL CRACKERS 🔥');
  const [logoUrl, setLogoUrl] = useState(logo);
  const [siteName, setSiteName] = useState('AK Crackers');

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home');
        const data = await response.json();
        if (data.success) {
          if (data.data.marquee_text) {
            setMarqueeText(data.data.marquee_text);
          }
          if (data.data.general_settings) {
            if (data.data.general_settings.logo_url) setLogoUrl(data.data.general_settings.logo_url);
            if (data.data.general_settings.site_name) setSiteName(data.data.general_settings.site_name);
            if (data.data.general_settings.favicon_url) {
              let link = document.querySelector("link[rel~='icon']");
              if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
              }
              link.href = data.data.general_settings.favicon_url;
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch marquee:', err);
      }
    };
    fetchCMS();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/home' },
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
                <Link to="/home" className="flex items-center gap-2 pointer-events-auto">
                  <img src={logoUrl} alt={siteName} className="h-12 md:h-16 w-auto drop-shadow-sm hover:scale-105 transition-transform duration-300" />
                  <div className="hidden sm:block">
                    <h1 className="text-xl md:text-2xl font-heading font-extrabold text-brand tracking-wider uppercase leading-tight">
                      {siteName}
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
                
                {/* Wishlist Icon */}
                <Link to="/wishlist" className="text-gray-700 hover:text-brand transition-colors relative group transition-transform duration-300 hover:scale-110">
                  <FiHeart className="h-5 w-5 md:h-6 md:w-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

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

    </>
  );
};

export default Navbar;
