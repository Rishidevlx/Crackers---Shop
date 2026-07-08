import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiMenu, FiChevronDown } from 'react-icons/fi';
import { FaBolt, FaStar } from 'react-icons/fa';
import logo from '../../assets/logo-removebg-preview.png';
import CartSidebar from '../cart/CartSidebar';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="w-full flex flex-col font-body">
        {/* Top Bar (Marquee) */}
        <div className="bg-brand text-white py-1.5 text-sm border-b border-white/10 overflow-hidden relative flex">
          <div className="w-full overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee hover:[animation-play-state:paused]">
              <div className="inline-flex items-center mr-12">
                <FaBolt className="mr-2 text-yellow-400" />
                <span>UPDATES: 50% offer for crackers. Order now and submit your Enquiry.</span>
              </div>
              <div className="inline-flex items-center mr-12">
                <FaStar className="mr-2 text-fuchsia-400" />
                <span>Minimum Purchase Value INR 2500. Freight charges extra.</span>
              </div>
              <div className="inline-flex items-center mr-12">
                <FaStar className="mr-2 text-fuchsia-400" />
                <span>As per the supreme court order, green crackers only available.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Bar */}
        <div className="bg-brand px-5 md:px-12 py-3 flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
          <div className="flex-shrink-0 cursor-pointer">
            <img src={logo} alt="AK Crackers" className="h-20 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" />
          </div>

          <div className="flex items-center bg-white rounded-full overflow-hidden w-full lg:w-1/2 max-w-2xl">
            <input 
              type="text" 
              placeholder="Search for products" 
              className="flex-1 border-none py-3 px-5 outline-none text-sm font-body"
            />
            <div className="hidden sm:flex items-center px-4 border-l border-gray-200 text-gray-500 text-sm cursor-pointer whitespace-nowrap hover:text-brand transition-colors">
              <span className="mr-1">SELECT CATEGORY</span>
              <FiChevronDown />
            </div>
            <button className="bg-[#F8B400] border-none px-6 h-full min-h-[44px] flex items-center justify-center cursor-pointer text-white text-lg transition-colors hover:bg-yellow-500">
              <FiSearch />
            </button>
          </div>

          <div className="flex items-center text-white lg:ml-auto">
            <div 
              className="flex items-center cursor-pointer relative ml-5 group"
              onClick={() => setIsCartOpen(true)}
            >
              <FiShoppingCart className="text-3xl mr-2.5 transition-transform duration-300 group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="font-bold text-[#F8B400] text-base">₹0.00</span>
                <span className="text-xs text-gray-200">0 items</span>
              </div>
              <span className="absolute -top-1.5 -left-2.5 bg-[#F8B400] text-black rounded-full w-4.5 h-4.5 p-1 flex items-center justify-center text-[10px] font-bold shadow-sm px-2">0</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-white flex flex-col lg:flex-row items-center border-b border-gray-200 shadow-sm relative z-10">
          <div className="bg-[#F8B400] text-black flex items-center px-7 py-3.5 font-semibold cursor-pointer text-sm w-full lg:w-auto justify-center lg:justify-start hover:bg-yellow-500 transition-colors">
            <FiMenu className="mr-2.5 text-xl" />
            <span>BROWSE CATEGORIES</span>
            <FiChevronDown className="ml-auto lg:ml-6" />
          </div>
          
          <nav className="flex items-center flex-wrap justify-center p-4 lg:p-0 lg:px-7 flex-1 gap-4 lg:gap-7">
            <a href="/" className="text-brand font-semibold text-sm transition-colors border-b-2 border-brand py-1">HOME</a>
            <a href="/shop" className="text-gray-800 hover:text-brand font-semibold text-sm transition-colors py-1">SHOP</a>
            <a href="/quick-buy" className="text-gray-800 hover:text-brand font-semibold text-sm transition-colors py-1">QUICK BUY</a>
            <a href="/about" className="text-gray-800 hover:text-brand font-semibold text-sm transition-colors py-1">ABOUT US</a>
            <a href="/contact" className="text-gray-800 hover:text-brand font-semibold text-sm transition-colors py-1">CONTACT US</a>
            <a href="/wishlist" className="text-gray-800 hover:text-brand font-semibold text-sm transition-colors py-1">WISHLIST</a>
          </nav>

          <div className="pb-4 lg:pb-0 lg:pr-7 text-brand font-bold text-sm text-center animate-pulse">
            <span>SPECIAL OFFER UPTO 80% DISCOUNT</span>
          </div>
        </div>
      </header>

      {/* Cart Sidebar Component */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
