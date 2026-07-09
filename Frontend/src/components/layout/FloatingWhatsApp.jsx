import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/1234567890" // Replace with actual number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group"
    >
      <FaWhatsapp className="text-3xl" />
      
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Chat with us!
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
