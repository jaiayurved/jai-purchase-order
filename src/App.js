// App.js - Final Version: MR Login + Dealer Dropdown Always Visible

import React, { useState, useEffect } from "react";
import products from "./data/products";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import CategoryTabs from "./components/CategoryTabs";
import ProductGrid from "./components/ProductGrid";
import CartReview from "./components/CartReview";
import OrderToast from "./components/OrderToast";

import useToast from "./hooks/useToast";
import useCart from "./hooks/useCartLogic";

import buildWhatsappMessage from "./utils/buildWhatsappMessage";
import "./styles/styles.css";

export default function App() {
  const [mrCode, setMrCode] = useState(() => localStorage.getItem("mrCode") || "");
  const [dealer, setDealer] = useState(() => {
    const stored = localStorage.getItem("selectedDealer");
    return stored ? JSON.parse(stored) : null;
  });
  const [selectedCategory, setSelectedCategory] = useState("Churna");
  const [tab, setTab] = useState("categories");
  const [search, setSearch] = useState("");
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);

  const { toast, showToast } = useToast();
  const {
    cart,
    qty,
    handleAdd,
    handleRemove,
    handleQty,
    handleSubmit: localSubmit,
    resetCart,
  } = useCart(showToast);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (storedCart.length > 0) setShowRestorePrompt(true);
  }, []);

  const handleSubmit = () => {
    const hasQty = cart.every(item => qty[item.name] && qty[item.name] > 0);
    if (!hasQty) {
      showToast("⚠️कृपया आइटम की मात्रा दर्ज करे");
      setTab("review");
      return;
    }
    const whatsappURL = buildWhatsappMessage(dealer, cart, qty);
    if (whatsappURL) {
      window.open(whatsappURL, "_blank");
      showToast("📲 WhatsApp opened — tap 'Send' to confirm your order");
      setTimeout(() => {
        resetCart();
        setTab("categories");
      }, 1500);
    } else {
      showToast("⚠️ Cannot send order. Please check cart/dealer.");
    }
  };

  const filteredProducts = products.filter((p) => {
    if (tab === "favorites") return cart.some((c) => c.name === p.name);
    if (search.trim()) return p.name.toLowerCase().includes(search.toLowerCase());
    return p.category === selectedCategory;
  });

  if (!mrCode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-4">🔑 Enter MR Login Code</h1>
        <input
          type="text"
          placeholder="Enter your MR code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full max-w-xs"
        />
        <button
          onClick={() => {
            if (search.trim()) {
              localStorage.setItem("mrCode", search.trim());
              setMrCode(search.trim());
              setSearch("");
            } else {
              alert("Please enter a valid MR Code.");
            }
          }}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded"
        >
          ✅ Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <Header dealerName={dealer?.["Dealer Name"] || "Dealer Not Selected"} />

        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <select
            value={dealer?.["Dealer Name"] || ""}
            onChange={(e) => {
              const selectedName = e.target.value;
              const allDealers = require("./data/dealerData.json");
              const selectedDealer = allDealers.find((d) => d["Dealer Name"] === selectedName);
              if (selectedDealer) {
                localStorage.setItem("selectedDealer", JSON.stringify(selectedDealer));
                setDealer(selectedDealer);
              }
            }}
            className="px-4 py-2 border border-blue-300 rounded-lg shadow-sm bg-white text-gray-700 font-semibold"
          >
            <option value="">👤 Select Dealer</option>
            {require("./data/dealerData.json")
              .map((d) => d["Dealer Name"])
              .sort()
              .map((name, i) => (
                <option key={i} value={name}>{name}</option>
              ))}
          </select>

          <CategoryTabs currentCategory={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        <Navigation tab={tab} setTab={setTab} cartCount={cart.length} />

        {tab === "categories" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 mb-4">
              <input
                type="text"
                placeholder="🔍 Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <ProductGrid items={filteredProducts} cart={cart} onAdd={handleAdd} />

            {cart.length > 0 && (
              <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
                <button
                  onClick={() => setTab("review")}
                  className="bg-green-600 hover:bg-green-700 hover:animate-pulse text-white font-semibold py-3 px-6 rounded-full shadow-xl text-base transition duration-300"
                >
                  🛒 View My Order ({cart.length})
                </button>
              </div>
            )}
          </>
        )}

        {tab === "review" && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4 border-b pb-2">
              📝 Your Items – Please Add Quantity
            </h2>
            <CartReview
              cart={cart}
              qty={qty}
              onQtyChange={handleQty}
              onRemove={handleRemove}
              onSubmit={handleSubmit}
              setTab={setTab}
            />
          </div>
        )}

        {toast && <OrderToast message={toast} />}

      </div>
    </div>
  );
}
