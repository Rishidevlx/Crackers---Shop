import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const FloatingLocation = () => {
  const [mapUrl, setMapUrl] = useState('');
  const { isCartOpen } = useCart();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/cms/home')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.contact_details && data.data.contact_details.map_url) {
          setMapUrl(data.data.contact_details.map_url);
        }
      })
      .catch(err => console.error('Error fetching contact details:', err));
  }, []);

  if (!mapUrl || isCartOpen) return null;

  const handleClick = (e) => {
    e.preventDefault();
    // Directly open the map URL provided by admin
    window.open(mapUrl, '_blank');
  };

  return (
    <a
      href={mapUrl}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[240px] sm:bottom-[170px] right-0 bg-blue-600 text-white p-3 pl-4 rounded-l-xl shadow-2xl hover:bg-blue-700 transition-all duration-300 z-50 flex items-center justify-center group"
    >
      <FaMapMarkerAlt className="text-2xl" />
      
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Our Location
      </span>
    </a>
  );
};

export default FloatingLocation;
