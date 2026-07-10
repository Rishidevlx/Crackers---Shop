import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen py-12 font-body">
      <div className="max-w-6xl mx-auto px-5 md:px-12">
        <h1 className="text-3xl font-bold font-heading text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <FiShoppingBag className="text-4xl text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any crackers to your cart yet.</p>
            <Link 
              to="/shop" 
              className="bg-brand text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md"
            >
              <FiArrowLeft /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="lg:w-2/3 flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-50 rounded-lg p-2 border border-gray-100 flex-shrink-0">
                    <img 
                      src={item.image || 'https://via.placeholder.com/150'} 
                      alt={item.name} 
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left w-full">
                    <Link to={`/product/${item.id}`} className="text-lg font-bold text-gray-800 hover:text-brand transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                      <span className="font-bold text-brand text-lg">₹{item.price.toFixed(2)}</span>
                      {item.unit && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">per {item.unit}</span>}
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-gray-300 rounded-md h-10 w-28">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-brand hover:bg-gray-50 transition-colors"
                      >
                        <FiMinus />
                      </button>
                      <span className="flex-1 h-full flex items-center justify-center font-semibold text-gray-800 border-x border-gray-300">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-brand hover:bg-gray-50 transition-colors"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <p className="font-bold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove Item"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
                
                <div className="flex flex-col gap-4 text-gray-600 mb-6 border-b border-gray-100 pb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-sm text-brand font-medium">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="font-bold text-gray-800 text-lg">Total</span>
                  <span className="font-bold text-brand text-2xl">₹{cartTotal.toFixed(2)}</span>
                </div>

                <button className="w-full bg-brand hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors shadow-md flex justify-center items-center gap-2 mb-3">
                  <FiShoppingBag /> Proceed to Checkout
                </button>
                
                <button 
                  onClick={async () => {
                    try {
                      const res = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home');
                      const data = await res.json();
                      const waNumber = data.data?.whatsapp_settings?.number || '';
                      
                      if (!waNumber) {
                        alert('WhatsApp number not configured. Please try again later.');
                        return;
                      }

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
                      window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
                    } catch (error) {
                      console.error('Error with whatsapp enquiry:', error);
                      alert('Something went wrong. Please try again.');
                    }
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-lg transition-colors shadow-md flex justify-center items-center gap-2"
                >
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157.1zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
                  WhatsApp Enquiry
                </button>
                
                <p className="text-center text-xs text-gray-400 mt-4">
                  Taxes and shipping calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
