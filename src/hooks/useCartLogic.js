// src/hooks/useCartLogic.js

import { useState, useEffect } from 'react';

export default function useCart(showToast) {
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState({});

  // Load cart and qty from localStorage on first mount
  	useEffect(() => {
  	const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  	setCart(storedCart);
  	setQty({});  // ❌ Do not restore qty
   }, []);


  // Save to localStorage when cart or qty changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("qty", JSON.stringify(qty));
  }, [cart, qty]);

  // Add product to cart
  const handleAdd = (item) => {
    if (!cart.some(i => i.name === item.name)) {
      setCart([...cart, item]);
      
    } else {
      showToast("🛒 Already in cart");
    }
  };

  // Remove product from cart
  const handleRemove = (itemName) => {
    const newCart = cart.filter(i => i.name !== itemName);
    const newQty = { ...qty };
    delete newQty[itemName];
    setCart(newCart);
    setQty(newQty);
    showToast("❌ Removed from order");
  };

  // Update quantity for product
  const handleQty = (itemName, value) => {
    const numeric = parseInt(value, 10);
    if (!isNaN(numeric) && numeric > 0) {
      setQty({ ...qty, [itemName]: numeric });
    } else {
      showToast("⚠️ Enter valid quantity");
    }
  };

  // Local submit: for testing purpose
  const handleSubmit = () => {
    const hasQty = cart.some(item => (qty[item.name] || 0) > 0);
    if (!hasQty) {
      showToast("⚠️ Please enter quantity");
      return;
    }

    const orderSummary = cart.map((item) => ({
      item: item.name,
      qty: qty[item.name] || 0,
    }));

    console.log("🛒 Final Order:", orderSummary);
    showToast("✅ Order submitted (local only)");
  };

  // Reset cart completely
  const resetCart = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("qty");
    setCart([]);
    setQty({});
  };

  return {
    cart,
    qty,
    handleAdd,
    handleRemove,
    handleQty,
    handleSubmit,
    resetCart,
  };
}
