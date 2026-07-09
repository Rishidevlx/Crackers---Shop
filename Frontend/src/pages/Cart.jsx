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

                <button className="w-full bg-brand hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors shadow-md flex justify-center items-center gap-2">
                  <FiShoppingBag /> Proceed to Checkout
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
