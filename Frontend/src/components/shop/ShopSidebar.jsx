import React, { useState, useEffect } from 'react';
import { FiFilter, FiSearch, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';

const ShopSidebar = ({ 
  searchQuery, setSearchQuery, 
  minPrice, setMinPrice, 
  maxPrice, setMaxPrice,
  selectedCategories, setSelectedCategories
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/categories');
        const data = await response.json();
        if (data.success) {
          const activeCats = data.data.filter(c => c.status === 'active');
          setCategories(activeCats);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-brand text-white p-3 rounded-r-xl shadow-2xl z-40 hover:bg-brand/90 transition-colors flex items-center gap-2 group border border-l-0 border-red-200"
      >
        <FiFilter className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider hidden group-hover:block transition-all mr-1">Filter</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Drawer */}
      <aside className={`fixed top-0 left-0 h-full w-[300px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-extrabold text-brand tracking-wider uppercase">Filters</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-brand transition-colors bg-gray-100 hover:bg-red-50 p-2 rounded-full">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Price Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-800 tracking-wider mb-4 uppercase">Filter by Price</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-[10px] text-gray-500 uppercase mb-1 block">From (₹)</label>
                <input 
                  type="number" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-brand text-sm"
                />
              </div>
              <span className="text-gray-400 mt-4">-</span>
              <div className="flex-1">
                <label className="text-[10px] text-gray-500 uppercase mb-1 block">To (₹)</label>
                <input 
                  type="number" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="5000"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-brand text-sm"
                />
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-full mt-5 bg-gray-900 hover:bg-brand text-white text-xs font-bold py-3 rounded-lg transition-colors uppercase tracking-wider shadow-md">
              Apply Filter
            </button>
          </div>

          {/* Categories Filter */}
          <div className="border-t border-gray-100 pt-8">
            <div 
              className="flex justify-between items-center cursor-pointer mb-4"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <h3 className="text-sm font-bold text-gray-800 tracking-wider uppercase">Categories</h3>
              {isCategoryOpen ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
            </div>
            
            <div className={`space-y-3 transition-all duration-300 overflow-hidden ${isCategoryOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              {categories.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No categories available.</p>
              ) : (
                categories.map((cat, index) => (
                  <label key={index} className={`flex items-center gap-3 cursor-pointer group ${cat.parent_id ? 'ml-6 relative before:content-[""] before:absolute before:-left-3 before:top-1/2 before:w-2 before:h-px before:bg-gray-300' : ''}`}>
                    {cat.parent_id && (
                      <div className="absolute -left-3 -top-3 w-px h-[calc(100%+12px)] bg-gray-300 pointer-events-none"></div>
                    )}
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="peer w-4 h-4 border-2 border-gray-300 rounded-sm bg-transparent checked:bg-brand checked:border-brand transition-colors cursor-pointer appearance-none"
                        checked={selectedCategories.includes(cat.name)}
                        onChange={() => handleCategoryChange(cat.name)}
                      />
                      <svg className="absolute w-3 h-3 text-white left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-brand transition-colors select-none">
                      {cat.name}
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ShopSidebar;
