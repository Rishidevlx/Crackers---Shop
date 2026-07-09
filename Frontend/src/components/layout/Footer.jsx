import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-footer text-gray-200 py-16 px-6 lg:px-20 font-body">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* FANCY COMET */}
        <div>
          <h3 className="font-heading text-white text-xl tracking-wider mb-6 uppercase">Fancy Comet</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Chotta Fancy</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">11/2" Fancy</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">2 1/2" Fancy</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">3 1/2" Fancy</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">4 1/2" Fancy</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Set Out</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Multi Shots</Link></li>
          </ul>
        </div>

        {/* NIGHT CRACKERS */}
        <div>
          <h3 className="font-heading text-white text-xl tracking-wider mb-6 uppercase">Night Crackers</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Chakkars</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Flower Pots</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Gujarathi Flower Pots</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Fountains</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Sparklers</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Rockets</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Kids</Link></li>
          </ul>
        </div>

        {/* DAY CRACKERS */}
        <div>
          <h3 className="font-heading text-white text-xl tracking-wider mb-6 uppercase">Day Crackers</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">One Sound</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Bombs</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Electric Crackers</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Bijili</Link></li>
          </ul>
        </div>

        {/* USEFUL LINKS */}
        <div>
          <h3 className="font-heading text-white text-xl tracking-wider mb-6 uppercase">Useful Links</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors duration-300">Returns & Refunds</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors duration-300">Terms & Conditions</Link></li>
            <li><Link to="/trademark" className="hover:text-white transition-colors duration-300">Trademark Certificate</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors duration-300">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors duration-300">About Us</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition-colors duration-300">Shipping Policy</Link></li>
            <li><Link to="/fund-scheme" className="hover:text-white transition-colors duration-300">Fund Scheme</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <div className="mb-4">
            <h4 className="text-white text-lg font-medium mb-1">Join our newsletter!</h4>
            <p className="text-xs text-gray-400">Will be used in accordance with our <Link to="/privacy-policy" className="text-yellow-500 hover:underline">Privacy Policy</Link></p>
          </div>

          <form className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent border border-gray-600 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-brand text-white w-full"
              required
            />
            <button 
              type="submit" 
              className="bg-brand text-white font-bold rounded-full px-5 py-3 text-sm hover:bg-red-700 transition-colors duration-300 w-full"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      {/* Bottom Footer Info */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} AK Crackers. All Rights Reserved.</p>
        <p className="mt-2 md:mt-0">138, Srivilliputhur Street | 93639 53616 | hari953616@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
