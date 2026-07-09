import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiFilter, FiCheckSquare, FiSquare, FiCheck } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Dropdown UI States
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Server error while loading products');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Bulk Actions
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) return;

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('http://localhost:5000/api/products/bulk', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids: selectedIds })
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
        setSelectedIds([]);
        fetchProducts();
      } else {
        toast.error(data.message || 'Failed to delete products');
      }
    } catch (error) {
      toast.error('Error deleting products');
    }
  };

  const handleBulkStatus = async (status) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('http://localhost:5000/api/products/bulk-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids: selectedIds, status })
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
        setSelectedIds([]);
        fetchProducts();
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  // Individual Actions
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Product deleted');
        fetchProducts();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('http://localhost:5000/api/products/bulk-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids: [id], status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Status updated to ${newStatus}`);
        fetchProducts();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  // Filtering
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? product.category_id === parseInt(categoryFilter) : true;
    const matchesStatus = statusFilter ? product.status === statusFilter : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const getImageUrl = (img) => {
    if (!img) return 'https://via.placeholder.com/50';
    if (img.startsWith('http')) return img;
    return `http://localhost:5000${img}`;
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your catalog, prices, and stock.</p>
        </div>
        <Link 
          to="/dashboard/products/add" 
          className="bg-[#3c50e0] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
        >
          <FiPlus /> Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Top Action Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
            <div className="relative w-full max-w-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#3c50e0] transition-colors bg-white text-sm"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Custom Category Dropdown */}
            <div className="relative min-w-[160px]">
              <button 
                onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsStatusOpen(false); }}
                className="w-full flex items-center justify-between border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm text-gray-700 shadow-sm hover:border-[#3c50e0] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FiFilter className={categoryFilter ? "text-[#3c50e0]" : "text-gray-400"} />
                  <span>
                    {categoryFilter === '' ? 'All Categories' : categories.find(c => c.id === parseInt(categoryFilter))?.name || 'Category'}
                  </span>
                </div>
                <svg className={`h-4 w-4 text-gray-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              {isCategoryOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsCategoryOpen(false)}></div>
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-lg shadow-xl z-50 py-1 max-h-60 overflow-y-auto">
                    <button 
                      onClick={() => { setCategoryFilter(''); setIsCategoryOpen(false); setCurrentPage(1); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span className={categoryFilter === '' ? 'font-medium text-[#3c50e0]' : 'text-gray-700'}>All Categories</span>
                      {categoryFilter === '' && <FiCheck className="text-[#3c50e0]" />}
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat.id}
                        onClick={() => { setCategoryFilter(cat.id.toString()); setIsCategoryOpen(false); setCurrentPage(1); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${cat.parent_id ? 'pl-8 text-gray-500' : 'text-gray-700 font-medium'}`}
                      >
                        <span className={categoryFilter === cat.id.toString() ? 'text-[#3c50e0]' : ''}>
                          {cat.parent_id && <span className="mr-2 text-gray-300">└</span>}
                          {cat.name}
                        </span>
                        {categoryFilter === cat.id.toString() && <FiCheck className="text-[#3c50e0]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Custom Status Dropdown */}
            <div className="relative min-w-[130px]">
              <button 
                onClick={() => { setIsStatusOpen(!isStatusOpen); setIsCategoryOpen(false); }}
                className="w-full flex items-center justify-between border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm text-gray-700 shadow-sm hover:border-[#3c50e0] transition-colors"
              >
                <span>
                  {statusFilter === '' ? 'All Status' : statusFilter === 'active' ? 'Active' : 'Inactive'}
                </span>
                <svg className={`h-4 w-4 text-gray-400 transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              {isStatusOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsStatusOpen(false)}></div>
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-lg shadow-xl z-50 py-1">
                    {[
                      { value: '', label: 'All Status' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' }
                    ].map(status => (
                      <button 
                        key={status.value}
                        onClick={() => { setStatusFilter(status.value); setIsStatusOpen(false); setCurrentPage(1); }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span className={statusFilter === status.value ? 'font-medium text-[#3c50e0]' : 'text-gray-700'}>{status.label}</span>
                        {statusFilter === status.value && <FiCheck className="text-[#3c50e0]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bulk Action Bar (Shows when items are selected) */}
        {selectedIds.length > 0 && (
          <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2 text-blue-700 font-medium text-sm">
              <FiCheckSquare className="text-blue-600" />
              {selectedIds.length} product(s) selected
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleBulkStatus('active')}
                className="text-sm px-3 py-1.5 bg-white border border-blue-200 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
              >
                Mark Active
              </button>
              <button 
                onClick={() => handleBulkStatus('inactive')}
                className="text-sm px-3 py-1.5 bg-white border border-blue-200 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                Mark Inactive
              </button>
              <div className="w-px h-5 bg-blue-200 mx-1"></div>
              <button 
                onClick={handleBulkDelete}
                className="text-sm px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 rounded-md flex items-center gap-1 transition-colors"
              >
                <FiTrash2 /> Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="p-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    checked={filteredProducts.length > 0 && selectedIds.length === filteredProducts.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 cursor-pointer text-[#3c50e0] border-gray-300 rounded focus:ring-[#3c50e0]"
                  />
                </th>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">Loading products...</td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3 text-gray-400 text-2xl">
                        <FiSearch />
                      </div>
                      <p className="font-medium">No products found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search query.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(product.id)}
                        onChange={() => handleSelectRow(product.id)}
                        className="w-4 h-4 cursor-pointer text-[#3c50e0] border-gray-300 rounded focus:ring-[#3c50e0]"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg border border-gray-200 overflow-hidden bg-white flex-shrink-0">
                          <img 
                            src={getImageUrl(product.main_image)} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Crect width='50' height='50' fill='%23f3f4f6'/%3E%3Cpath d='M25 15c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-2-12h4v5h-4z' fill='%239ca3af'/%3E%3C/svg%3E"; }}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {product.category_name || <span className="text-gray-400 italic">Uncategorized</span>}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800">₹{parseFloat(product.price).toFixed(2)}</span>
                        {product.original_price && parseFloat(product.original_price) > parseFloat(product.price) && (
                          <span className="text-xs text-gray-400 line-through">₹{parseFloat(product.original_price).toFixed(2)}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => toggleStatus(product.id, product.status)}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors border ${
                          product.status === 'active' 
                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {product.status === 'active' ? (
                          <><FiCheck className="mr-1" /> Active</>
                        ) : (
                          'Inactive'
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => navigate(`/dashboard/products/edit/${product.id}`)}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-[#3c50e0] hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
            <span className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-800">{indexOfFirstItem + 1}</span> to <span className="font-medium text-gray-800">{Math.min(indexOfLastItem, filteredProducts.length)}</span> of <span className="font-medium text-gray-800">{filteredProducts.length}</span> results
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-200 text-sm font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Prev
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-[#3c50e0] text-white border border-[#3c50e0]' 
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-gray-200 text-sm font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default AllProducts;
