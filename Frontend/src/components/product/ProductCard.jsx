import React, { useState } from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState('');

  const handleQtyChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      setQty(val);
    } else if (e.target.value === '') {
      setQty('');
    }
  };

  const increment = () => setQty((prev) => (prev === '' ? 1 : prev + 1));
  const decrement = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  if (viewMode === 'list') {
    return (
      <div className="grid grid-cols-12 gap-2 items-center bg-white border-b border-gray-200 py-3 px-2 hover:bg-gray-50 transition-colors text-sm">
        <div className="col-span-2 sm:col-span-1 flex justify-center">
          <Link to={`/product/${product.id}`}>
            <img 
              src={product.image || 'https://via.placeholder.com/50'} 
              alt={product.name} 
              className="w-12 h-12 object-contain border border-gray-200 p-1 bg-white rounded shadow-sm"
            />
          </Link>
        </div>
        <div className="col-span-4 sm:col-span-5">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
            {product.description && (
              <p className="text-xs text-brand mt-0.5">{product.description}</p>
            )}
          </Link>
        </div>
        <div className="col-span-2 sm:col-span-2 text-center">
          {product.originalPrice && (
            <div className="text-xs text-red-500 line-through">₹{product.originalPrice}</div>
          )}
          <div className="font-bold text-green-600">₹{product.price}</div>
        </div>
        <div className="col-span-2 sm:col-span-2 flex justify-center">
          <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden h-8 w-20 sm:w-24">
             <button onClick={decrement} className="px-2 text-gray-600 hover:bg-gray-100 h-full font-bold">-</button>
             <input type="text" placeholder="Qty" value={qty} onChange={handleQtyChange} className="w-full text-center text-xs outline-none h-full border-x border-gray-300 placeholder:text-gray-400 placeholder:font-normal" />
             <button onClick={increment} className="px-2 text-gray-600 hover:bg-gray-100 h-full font-bold">+</button>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-2 flex items-center justify-between font-bold text-gray-700">
          <span className="hidden sm:inline-block">₹{((qty || 0) * product.price).toFixed(0)}</span>
          <button 
            onClick={() => addToCart(product, qty || 1)}
            className="bg-brand hover:bg-brand/90 text-white px-4 py-1.5 rounded ml-auto shadow-sm transition-colors flex items-center justify-center"
          >
            <FiShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-primary border border-gray-200 rounded-lg overflow-hidden relative shadow-sm hover:shadow-md transition-shadow h-36 sm:h-40">
      
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-0 left-0 bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg z-10">
          {product.discount}%
        </div>
      )}

      {/* Image Side */}
      <Link 
        to={`/product/${product.id}`} 
        className="w-[40%] relative flex items-center justify-center p-3 bg-gradient-to-br from-green-700 to-green-800"
      >
        <img 
          src={product.image || 'https://via.placeholder.com/200'} 
          alt={product.name} 
          className="w-full h-full max-h-40 object-contain rounded drop-shadow-md group-hover:scale-105 transition-transform"
        />
      </Link>

      {/* Details Side */}
      <div className="w-[60%] p-3 sm:p-4 flex flex-col justify-between">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Pricing */}
        <div className="mt-2 text-center text-sm">
          {product.originalPrice && (
            <div className="text-red-500 line-through text-xs font-semibold">
              ₹{product.originalPrice} / 1Pkt
            </div>
          )}
          <div className="font-extrabold text-gray-900">
            ₹{product.price} / 1Pkt
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white h-8 w-16 sm:w-24">
             <button onClick={decrement} className="px-2 text-brand font-bold hover:bg-gray-100 h-full">-</button>
             <input type="text" placeholder="Qty" value={qty} onChange={handleQtyChange} className="w-full text-center text-xs outline-none h-full border-x border-gray-300 placeholder:text-gray-400 placeholder:font-normal font-semibold text-gray-700" />
             <button onClick={increment} className="px-2 text-brand font-bold hover:bg-gray-100 h-full">+</button>
          </div>
          <button 
            onClick={() => addToCart(product, qty || 1)}
            className="bg-brand text-white px-3 sm:px-4 py-1.5 rounded-md shadow hover:bg-brand/90 transition-colors flex items-center justify-center"
          >
            <FiShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
