import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const CartSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-primary z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col font-body ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-brand text-white p-5 flex justify-between items-center">
          <h2 className="text-xl font-heading tracking-wider">YOUR CART</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 p-5 overflow-y-auto flex flex-col items-center justify-center text-center">
          {/* Placeholder for empty cart */}
          <div className="w-24 h-24 mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <FiShoppingCart className="text-4xl text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">Your cart is currently empty.</p>
          <button 
            onClick={onClose}
            className="mt-6 bg-footer text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm font-semibold"
          >
            CONTINUE SHOPPING
          </button>
        </div>

        {/* Footer Area */}
        <div className="p-5 border-t border-gray-200 bg-white">
          <div className="flex justify-between items-center mb-4 font-bold text-lg text-gray-800">
            <span>Subtotal:</span>
            <span className="text-brand">₹0.00</span>
          </div>
          <p className="text-xs text-gray-500 mb-4 text-center">Taxes and shipping calculated at checkout</p>
          <button className="w-full bg-[#25D366] text-white py-3 rounded-full font-bold hover:bg-[#128C7E] transition-colors shadow-md flex items-center justify-center">
            <FaWhatsapp className="text-xl mr-2" />
            WHATSAPP ENQUIRY
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
