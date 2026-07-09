import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/product/ProductCard';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  return (
    <main className="bg-gray-50 min-h-screen pb-16 pt-8 font-body">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Wishlist</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-8 border-l-4 border-brand pl-4 uppercase">
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 py-20 px-4 text-center">
            {/* Empty State Icon (simulating the dashed bookmark with a heart) */}
            <div className="w-24 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-6 relative">
              <div className="absolute -left-4 bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center">
                <FiHeart className="text-gray-400" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-8 h-1 rounded bg-gray-300"></div>
              </div>
            </div>
            
            <h2 className="text-gray-500 font-medium text-lg mb-6">
              You haven't saved anything yet.
            </h2>
            
            <Link to="/shop">
              <button className="bg-footer hover:bg-brand text-white font-semibold py-2.5 px-8 rounded transition-colors duration-300 shadow-md">
                Save Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default Wishlist;
