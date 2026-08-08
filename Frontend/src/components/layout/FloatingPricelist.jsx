import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaTimes, FaDownload } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const FloatingPricelist = () => {
  const { isCartOpen } = useCart();
  const [pdfUrl, setPdfUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/cms/home')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.general_settings?.pricelist_pdf_url) {
          setPdfUrl(data.data.general_settings.pricelist_pdf_url);
        }
      })
      .catch(err => console.error('Error fetching pricelist setting:', err));
  }, []);

  if (!pdfUrl || isCartOpen) return null;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-[370px] sm:bottom-[300px] right-0 bg-[#8B5CF6] text-white p-3 pl-4 rounded-l-xl shadow-2xl hover:bg-[#8B5CF6]/90 transition-all duration-300 z-50 flex items-center justify-center group"
      >
        <FaFilePdf className="text-2xl animate-pulse" />
        
        {/* Tooltip on hover */}
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Download Pricelist
        </span>
      </button>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden relative z-10 animate-fade-in-up">
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-white/80 p-1.5 rounded-full z-10 transition-colors"
            >
              <FaTimes />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8 text-center mt-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                <FaFilePdf className="text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 font-heading mb-3">
                Latest Price List
              </h2>
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                Download our complete and updated product price list in a convenient PDF format.
              </p>

              <a 
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                download="Shop_Pricelist.pdf"
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-[#8B5CF6] flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition-all"
              >
                <FaDownload /> Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingPricelist;
