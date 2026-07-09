import React from 'react';
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

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
            <button className="w-full bg-[#25D366] text-white py-3 rounded-full font-bold hover:bg-[#128C7E] transition-colors shadow-md flex items-center justify-center gap-2">
              <FaWhatsapp className="text-xl" />
              WHATSAPP ENQUIRY
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
