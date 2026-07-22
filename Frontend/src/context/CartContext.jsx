import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart items from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const setProductQuantity = (product, quantity) => {
    if (quantity === '' || quantity <= 0 || isNaN(quantity)) {
      setCartItems(prev => prev.filter(item => item.id !== product.id));
      return;
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: parseInt(quantity) } : item
        );
      }
      return [...prev, { ...product, quantity: parseInt(quantity) }];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const generateWhatsAppUrl = (waNumber, itemsToOrder, totalAmount) => {
    let message = "Hi, I would like to order/inquire about the following items:\n\n";
    itemsToOrder.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      if (item.category) {
        message += `   Category: ${item.category}\n`;
      }
      message += `   Price: ₹${item.price.toFixed(2)}\n`;
      message += `   Qty: ${item.quantity} ${item.unit ? item.unit : ''}\n`;
      if (item.image) {
        message += `   Link/Image: ${item.image}\n`;
      }
      message += '\n';
    });
    message += `*Total Estimated Amount: ₹${totalAmount.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${waNumber}?text=${encodedMessage}`;
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      setProductQuantity, 
      clearCart, 
      cartTotal, 
      cartCount,
      generateWhatsAppUrl
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
