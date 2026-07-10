import React, { useState } from 'react';
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [waSettings, setWaSettings] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateWhatsAppUrl = (waNumber) => {
    let message = "Hi, I would like to order/inquire about the following items:\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      if (item.category) {
        message += `   Category: ${item.category}\n`;
      }
      message += `   Price: ₹${item.price.toFixed(2)}\n`;
      message += `   Qty: ${item.quantity} ${item.unit ? item.unit : ''}\n`;
      if (item.image) {
        message += `   Link/Image: ${item.image}\n`;
      }
      message += '\n';
    });
    message += `*Total Estimated Amount: ₹${cartTotal.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${waNumber}?text=${encodedMessage}`;
  };

  const handleEnquiryClick = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home');
      const data = await res.json();
      const currentWaSettings = data.data?.whatsapp_settings;
      
      if (!currentWaSettings?.number) {
        toast.error('WhatsApp number not configured. Please try again later.');
        return;
      }
      
      setWaSettings(currentWaSettings);

      if (currentWaSettings.collect_mobile_number) {
        setIsModalOpen(true);
      } else {
        window.open(generateWhatsAppUrl(currentWaSettings.number), '_blank');
      }
    } catch (error) {
      console.error('Error fetching latest settings:', error);
      toast.error('Something went wrong. Please try again.');
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
        window.open(generateWhatsAppUrl(waSettings.number), '_blank');
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
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-primary z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col font-body ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-brand text-white p-5 flex justify-between items-center">
          <h2 className="text-xl font-heading tracking-wider">YOUR CART</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Cart Items Area */}
        <div className={`flex-1 overflow-y-auto p-5 ${cartItems.length === 0 ? 'flex flex-col items-center justify-center text-center' : ''}`}>
          {cartItems.length === 0 ? (
            <>
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
            </>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-4 relative">
                  {/* Image */}
                  <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 border border-gray-100 flex-shrink-0">
                    <img 
                      src={item.image || 'https://via.placeholder.com/150'} 
                      alt={item.name} 
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800 line-clamp-1 pr-6">{item.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="font-bold text-brand text-sm">₹{item.price.toFixed(2)}</span>
                        {item.unit && <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">per {item.unit}</span>}
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded-md h-7 w-20">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-full flex items-center justify-center text-gray-600 hover:text-brand hover:bg-gray-50 transition-colors text-xs"
                        >
                          <FiMinus />
                        </button>
                        <span className="flex-1 h-full flex items-center justify-center font-semibold text-gray-800 border-x border-gray-300 text-xs">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-full flex items-center justify-center text-gray-600 hover:text-brand hover:bg-gray-50 transition-colors text-xs"
                        >
                          <FiPlus />
                        </button>
                      </div>

                      <div className="font-bold text-gray-800 text-sm">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-200 bg-white">
            <div className="flex justify-between items-center mb-4 font-bold text-lg text-gray-800">
              <span>Subtotal:</span>
              <span className="text-brand">₹{cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-4 text-center">Taxes and shipping calculated at checkout</p>
            <button 
              onClick={handleEnquiryClick}
              className="w-full bg-[#25D366] text-white py-3 rounded-full font-bold hover:bg-[#128C7E] transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="text-xl" />
              WHATSAPP ENQUIRY
            </button>
          </div>
        )}
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

export default CartSidebar;
