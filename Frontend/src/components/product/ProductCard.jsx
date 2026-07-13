import React from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const { addToCart } = useCart();

  return (
    <div className={`group flex bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden font-body relative border border-gray-100 ${
      viewMode === 'list' ? 'flex-row' : 'flex-col'
    }`}>
      
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-3 left-3 bg-[#F8B400] text-white text-xs font-bold px-2 py-1 rounded-full z-20 shadow-sm">
          -{product.discount}%
        </div>
      )}

      {/* Wishlist Heart Icon */}
      <button 
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-20 text-gray-400 hover:text-brand hover:scale-110 transition-all duration-300 bg-white p-2 rounded-full shadow-sm hover:shadow-md"
      >
        {isWishlisted ? (
          <FaHeart className="text-lg text-brand" />
        ) : (
          <FiHeart className="text-lg" />
        )}
      </button>

      {/* Product Image Link */}
      <Link 
        to={`/product/${product.id}`} 
        className={`relative bg-gray-50 flex items-center justify-center p-4 overflow-hidden block ${
          viewMode === 'list' ? 'w-1/3 min-w-[150px] sm:min-w-[200px] border-r border-gray-100' : 'w-full h-48 sm:h-56'
        }`}
      >
        <img 
          src={product.image || 'https://via.placeholder.com/200'} 
          alt={product.name} 
          className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-in-out drop-shadow-md"
        />
        
        {/* Overlay Action (optional, keeping it simple for now) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>

      {/* Product Details */}
      <div className={`p-5 flex flex-col flex-1 ${viewMode === 'list' ? 'justify-center text-left' : 'text-center'}`}>
        <Link to={`/product/${product.id}`}>
          <h3 className={`font-bold text-gray-800 hover:text-brand transition-colors line-clamp-2 ${viewMode === 'list' ? 'text-lg md:text-xl mb-2' : 'text-base mb-1 line-clamp-1'}`}>
            {product.name}
          </h3>
        </Link>
        
        {product.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Pricing */}
        <div className={`mt-auto mb-4 flex items-center gap-2 ${viewMode === 'list' ? 'justify-start mt-4' : 'justify-center'}`}>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-bold text-[#F8B400]">
            ₹{product.price.toFixed(2)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <div className={`${viewMode === 'list' ? 'w-48 max-w-full' : 'w-full'}`}>
          <button 
            onClick={() => addToCart(product, product.moq || 1)}
            className="w-full bg-footer text-white py-2.5 rounded-full flex items-center justify-center gap-2 font-semibold text-sm hover:bg-brand transition-colors duration-300"
          >
            <FiShoppingCart />
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
