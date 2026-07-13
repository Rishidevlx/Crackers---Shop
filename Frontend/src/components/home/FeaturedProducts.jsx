import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/products/top-selling');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch top selling products:', error);
      }
    };
    fetchTopSelling();
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="py-10 px-12 bg-white">
      <div className="mb-7">
        <h2 className="text-2xl text-gray-800 mb-1 font-medium uppercase font-heading">LATEST TOP SELLING</h2>
        <div className="w-12 h-0.5 bg-[#F8B400]"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-7 mt-5">
        {products.map((product) => {
          const originalPrice = parseFloat(product.original_price);
          const price = parseFloat(product.price);
          
          return (
            <div className="border border-gray-100 rounded-lg p-4 text-center transition-shadow duration-300 hover:shadow-lg bg-primary group flex flex-col" key={product.id}>
              <Link to={`/product/${product.id}`} className="w-full h-40 flex items-center justify-center mb-4 overflow-hidden relative">
                {/* Product Image with scale on hover */}
                <img 
                  src={product.main_image || 'https://via.placeholder.com/200'} 
                  alt={product.name}
                  className="max-h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 drop-shadow-sm" 
                />
              </Link>
              <div className="flex flex-col items-center flex-1">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-sm font-bold text-gray-800 mb-2 font-body line-clamp-1 hover:text-brand transition-colors">{product.name}</h3>
                </Link>
                <div className="mb-4 mt-auto flex items-center gap-2">
                  <span className="font-bold text-[#F8B400] text-base">₹{price.toFixed(2)}</span>
                  {originalPrice && originalPrice > price && (
                    <span className="text-gray-400 line-through text-xs">₹{originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <button 
                  onClick={() => addToCart(product, product.moq || 1)}
                  className="w-full bg-footer text-white border-none py-2 px-4 rounded-full cursor-pointer font-bold text-xs transition-colors duration-300 hover:bg-brand font-body mt-auto"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
