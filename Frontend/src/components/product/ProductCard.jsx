import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { FaHeart, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const { cartItems, setProductQuantity, generateWhatsAppUrl } = useCart();
  
  const cartItem = cartItems.find(item => item.id === product.id);
  const qty = cartItem ? cartItem.quantity : '';

  const handleQtyChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      setProductQuantity(product, '');
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num) && num >= 0) {
      setProductQuantity(product, num);
    }
  };

  const increment = () => setProductQuantity(product, qty === '' ? 1 : qty + 1);
  const decrement = () => {
    if (qty > 1) setProductQuantity(product, qty - 1);
    else setProductQuantity(product, '');
  };

  const handleSingleOrder = async () => {
    const orderQty = qty || 1;
    if (!qty) setProductQuantity(product, 1);
    
    const toastId = toast.loading('Connecting to WhatsApp...');
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home');
      const data = await res.json();
      const currentWaSettings = data.data?.whatsapp_settings;
      
      if (!currentWaSettings?.number) {
        toast.error('WhatsApp number not configured.', { id: toastId });
        return;
      }
      
      const itemToOrder = { ...product, quantity: orderQty };
      const url = generateWhatsAppUrl(currentWaSettings.number, [itemToOrder], itemToOrder.price * orderQty);
      toast.dismiss(toastId);
      window.open(url, '_blank');
    } catch (error) {
      toast.error('Failed to connect.', { id: toastId });
    }
  };

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
        <div className="col-span-3 sm:col-span-5">
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
        <div className="col-span-3 sm:col-span-2 flex justify-center">
          <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden h-9 w-24 shrink-0">
             <button onClick={decrement} className="px-2.5 text-gray-600 hover:bg-gray-100 h-full font-bold">-</button>
             <input type="text" placeholder="Qty" value={qty} onChange={handleQtyChange} className="w-full text-center text-sm outline-none h-full border-x border-gray-300 placeholder:text-gray-400 placeholder:font-normal font-semibold text-gray-800" />
             <button onClick={increment} className="px-2.5 text-gray-600 hover:bg-gray-100 h-full font-bold">+</button>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-2 flex items-center justify-between font-bold text-gray-700">
          <span className="hidden sm:inline-block">₹{((qty || 0) * product.price).toFixed(0)}</span>
          <button 
            onClick={handleSingleOrder}
            className="bg-brand hover:bg-brand/90 text-white px-3 sm:px-5 py-2 rounded ml-auto shadow-sm transition-colors flex items-center justify-center text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap"
          >
            ORDER NOW
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-primary border border-gray-200 rounded-xl overflow-hidden relative shadow-sm hover:shadow-md transition-shadow h-44 sm:h-48 group">
      
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-2 left-2 bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow">
          {product.discount}%
        </div>
      )}

      {/* Image Left */}
      <Link 
        to={`/product/${product.id}`} 
        className="w-[38%] sm:w-[40%] shrink-0 flex items-center justify-center p-3 bg-gradient-to-br from-green-700 to-green-800 overflow-hidden"
      >
        <img 
          src={product.image || 'https://via.placeholder.com/200'} 
          alt={product.name} 
          className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Details Right */}
      <div className="flex-1 min-w-0 p-3 sm:p-4 flex flex-col justify-between overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 hover:text-brand transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Pricing */}
        <div className="flex flex-col items-center text-sm">
          {product.originalPrice && (
            <span className="text-red-400 line-through text-xs font-medium">
              ₹{product.originalPrice} / 1Pkt
            </span>
          )}
          <span className="font-extrabold text-gray-900">
            ₹{product.price} / 1Pkt
          </span>
        </div>

        {/* Action Row */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white h-9 w-24 sm:w-28 shrink-0">
             <button onClick={decrement} className="px-2 text-brand font-bold hover:bg-gray-100 h-full flex items-center justify-center">−</button>
             <input type="text" placeholder="Qty" value={qty} onChange={handleQtyChange} className="w-full text-center text-sm outline-none h-full border-x border-gray-300 placeholder:text-gray-400 font-semibold text-gray-800" />
             <button onClick={increment} className="px-2 text-brand font-bold hover:bg-gray-100 h-full flex items-center justify-center">+</button>
          </div>
          <button 
            onClick={handleSingleOrder}
            className="flex-1 bg-brand text-white py-2 rounded-lg shadow hover:bg-brand/90 transition-colors text-[11px] sm:text-xs font-bold uppercase tracking-wide whitespace-nowrap h-9 flex items-center justify-center"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
