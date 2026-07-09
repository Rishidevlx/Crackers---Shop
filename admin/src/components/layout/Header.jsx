import React from 'react';
import { FiMenu, FiBell, FiSearch, FiUser } from 'react-icons/fi';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-gray-500 hover:text-brand transition-colors lg:hidden">
          <FiMenu className="text-xl" />
        </button>
        
        <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1.5 w-64 border border-transparent focus-within:border-brand/30 focus-within:bg-white transition-all">
          <FiSearch className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <button className="text-gray-500 hover:text-brand relative transition-colors">
          <FiBell className="text-xl" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-200 mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-semibold text-gray-800 group-hover:text-brand transition-colors">Admin User</span>
            <span className="text-xs text-gray-500">Administrator</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand border border-brand/20">
            <FiUser className="text-lg" />
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
