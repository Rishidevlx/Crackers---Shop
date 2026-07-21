import React, { useState, useEffect } from 'react';
import ShopBanner from '../components/shop/ShopBanner';
import ShopSidebar from '../components/shop/ShopSidebar';
import ShopTopBar from '../components/shop/ShopTopBar';
import ProductCard from '../components/product/ProductCard';
import Pagination from '../components/common/Pagination';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/products');
        const data = await response.json();
        if (data.success) {
          // Map database structure to frontend expectations
          const formattedProducts = data.data.map(p => {
            let discount = null;
            const orig = p.original_price ? parseFloat(p.original_price) : null;
            const curr = parseFloat(p.price);
            if (orig && orig > curr) {
              discount = Math.round(((orig - curr) / orig) * 100);
            }
            
            // Description might be a JSON string array, parse to get a single string snippet
            let descSnippet = '';
            if (Array.isArray(p.description) && p.description.length > 0) {
              descSnippet = p.description[0];
            } else if (typeof p.description === 'string') {
              try {
                const parsed = JSON.parse(p.description);
                descSnippet = Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : p.description;
              } catch (e) {
                descSnippet = p.description;
              }
            }

            return {
              id: p.id,
              name: p.name,
              category: p.category_name, // Map for the filter logic
              description: descSnippet,
              originalPrice: orig || null,
              price: curr,
              discount: discount,
              image: p.main_image
            };
          });
          setProducts(formattedProducts);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const min = minPrice === '' ? 0 : Number(minPrice);
    const max = maxPrice === '' ? Infinity : Number(maxPrice);
    const matchesPrice = product.price >= min && product.price <= max;
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);

    return matchesSearch && matchesPrice && matchesCategory;
  });

  let sortedProducts = [...filteredProducts];
  if (sortOption === 'price-low') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-high') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'latest') {
    sortedProducts.sort((a, b) => b.id - a.id);
  }

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handleItemsPerPageChange = (num) => {
    setItemsPerPage(num);
    setCurrentPage(1);
  };

  return (
    <main className="shop-page bg-gray-50 min-h-screen pb-16">
      <ShopBanner />
      
      <div className="max-w-7xl mx-auto px-5 md:px-12 pt-12 flex flex-col relative">
        {/* Sidebar */}
        <ShopSidebar 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          minPrice={minPrice} setMinPrice={setMinPrice}
          maxPrice={maxPrice} setMaxPrice={setMaxPrice}
          selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
        />

        {/* Main Content */}
        <div className="w-full">
          <ShopTopBar 
            itemsPerPage={itemsPerPage}
            setItemsPerPage={handleItemsPerPageChange}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            sortOption={sortOption}
            setSortOption={setSortOption}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Product Grid / List */}
          <div className="w-full">
            {sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).length > 0 ? (
              <div className="flex flex-col gap-8">
                {viewMode === 'list' && (
                  <div className="grid grid-cols-12 gap-2 bg-[#FFC107] text-gray-900 font-bold text-[10px] sm:text-sm py-3 px-2 mb-[-1.5rem] text-center uppercase border-b-[3px] border-brand sticky top-[60px] md:top-20 z-20">
                    <div className="col-span-2 sm:col-span-1">Image</div>
                    <div className="col-span-3 sm:col-span-5 text-left pl-2">Products</div>
                    <div className="col-span-2 sm:col-span-2">Price</div>
                    <div className="col-span-3 sm:col-span-2">Qty</div>
                    <div className="col-span-2 sm:col-span-2">Amount</div>
                  </div>
                )}
                
                {Object.entries(
                  sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).reduce((acc, product) => {
                    const cat = product.category || 'Uncategorized';
                    if (!acc[cat]) acc[cat] = [];
                    acc[cat].push(product);
                    return acc;
                  }, {})
                ).map(([category, prods]) => (
                  <div key={category} className="flex flex-col">
                    {/* Category Header */}
                    <div className="w-full text-center text-white font-bold py-2 px-4 uppercase tracking-wider mb-4 shadow-sm text-sm bg-brand">
                      {category}
                    </div>
                    
                    {/* Products Container */}
                    <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" : "flex flex-col border border-gray-200 bg-white"}>
                      {prods.map(product => (
                        <ProductCard key={product.id} product={product} viewMode={viewMode} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="col-span-full py-10 text-center text-gray-500 font-semibold bg-white rounded-xl shadow-sm border border-gray-100">
                No products found matching your filters.
              </div>
            )}
          </div>

          {sortedProducts.length > 0 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Shop;
