import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMessageCircle, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FloatingOrderBar = () => {
  const { cartItems, cartTotal, cartCount, generateWhatsAppUrl } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waSettings, setWaSettings] = useState(null);



  const handleOrderClick = async () => {
    if (cartCount === 0) {
      toast.error('Please add at least one product to order.');
      return;
    }
    const toastId = toast.loading('Connecting to WhatsApp...');
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home');
      const data = await res.json();
      const currentWaSettings = data.data?.whatsapp_settings;
      
      if (!currentWaSettings?.number) {
        toast.error('WhatsApp number not configured. Please try again later.', { id: toastId });
        return;
      }
      
      setWaSettings(currentWaSettings);
      toast.dismiss(toastId);

      if (currentWaSettings.collect_mobile_number) {
        setIsModalOpen(true);
      } else {
        window.open(generateWhatsAppUrl(currentWaSettings.number, cartItems, cartTotal), '_blank');
      }
    } catch (error) {
      console.error('Error fetching latest settings:', error);
      toast.error('Something went wrong. Please try again.', { id: toastId });
    }
  };

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/enquiries/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile_number: mobileNumber,
          cart_data: cartItems
        })
      });

      const data = await response.json();
      if (data.success) {
        setIsModalOpen(false);
        setMobileNumber('');
        window.open(generateWhatsAppUrl(waSettings.number, cartItems, cartTotal), '_blank');
      } else {
        toast.error('Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Enquiry error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full z-40 p-3 sm:p-6 pointer-events-none">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border-t-4 border-brand shadow-[0_-10px_40px_rgba(0,0,0,0.15)] rounded-2xl pointer-events-auto flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 gap-4 overflow-hidden relative">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-brand to-brand opacity-80"></div>
          
          <div className="flex flex-1 items-center justify-between w-full gap-2 sm:gap-8 overflow-x-auto no-scrollbar">
            <div className="flex flex-col flex-1 text-center sm:text-left">
              <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider whitespace-nowrap">Products</span>
              <span className="text-lg sm:text-xl font-black text-gray-800 leading-none">{cartItems.length}</span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-gray-200 shrink-0"></div>
            <div className="flex flex-col flex-1 text-center sm:text-left">
              <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider whitespace-nowrap">Total Qty</span>
              <span className="text-lg sm:text-xl font-black text-gray-800 leading-none">{cartCount}</span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-gray-200 shrink-0"></div>
            <div className="flex flex-col flex-1 text-center sm:text-left">
              <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider whitespace-nowrap">Est. Price</span>
              <span className="text-lg sm:text-xl font-black text-brand leading-none">₹{cartTotal.toFixed(0)}</span>
            </div>
          </div>

          <button 
            onClick={handleOrderClick}
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white px-6 sm:px-8 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest whitespace-nowrap transform hover:scale-[1.02]"
          >
            <FaWhatsapp className="text-xl" />
            ORDER NOW
          </button>
        </div>
      </div>

      {/* Modal for Mobile Number Collection */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4 font-body">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden relative animate-fade-in-up">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-gray-100 p-1.5 rounded-full z-10 transition-colors"
            >
              <FiX />
            </button>
            <div className="p-6 sm:p-8 text-center pt-10">
              <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                <FiMessageCircle />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                WhatsApp Enquiry
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Please provide your mobile number before proceeding to WhatsApp.
              </p>
              <form onSubmit={handleMobileSubmit} className="flex flex-col gap-4">
                <div className="flex bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand focus-within:border-brand transition-shadow">
                  <div className="flex items-center justify-center px-4 bg-gray-100 border-r border-gray-300 text-gray-700 font-semibold select-none">
                    +91
                  </div>
                  <input 
                    type="text" 
                    value={mobileNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 10) setMobileNumber(val);
                    }}
                    placeholder="Enter 10-digit number" 
                    className="flex-1 w-full px-4 py-3 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-lg shadow-md hover:bg-[#128C7E] hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Proceed to WhatsApp'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingOrderBar;
