// App.js - Final Version with Cart Restore Hindi Message on Item Select Screen

import React, { useState, useEffect } from "react";
import products from "./data/products";
import dealerData from "./data/dealerData.json";

import WelcomeScreen from "./components/WelcomeScreen";
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
  const [showWelcome, setShowWelcome] = useState(true);
  const [mrCodeInput, setMrCodeInput] = useState("");
  const [isMrLoggedIn, setIsMrLoggedIn] = useState(false);

  const [dealer, setDealer] = useState(() => {
    const stored = localStorage.getItem("selectedDealer");
    return stored ? JSON.parse(stored) : null;
  });
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
    const timer = setTimeout(() => setShowWelcome(false), 2500);
    return () => clearTimeout(timer);
  }, []);

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
    return true;
  });

  if (showWelcome) return <WelcomeScreen onFinish={() => setShowWelcome(false)} />;

  if (!isMrLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-4">🔑 Enter MR Login Code</h1>
        <input
          type="text"
          placeholder="Enter your MR code"
          value={mrCodeInput}
          onChange={(e) => setMrCodeInput(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full max-w-xs"
          autoFocus
        />
        <button
          onClick={() => {
            if (mrCodeInput.trim()) {
              setIsMrLoggedIn(true);
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
              const selectedDealer = dealerData.find((d) => d["Dealer Name"] === selectedName);
              if (selectedDealer) {
                localStorage.setItem("selectedDealer", JSON.stringify(selectedDealer));
                setDealer(selectedDealer);
              }
            }}
            className="px-4 py-2 border border-blue-300 rounded-lg shadow-sm bg-white text-gray-700 font-semibold"
          >
            <option value="">👤 Select Dealer</option>
            {dealerData
              .map((d) => d["Dealer Name"])
              .sort()
              .map((name, i) => (
                <option key={i} value={name}>{name}</option>
              ))}
          </select>
        </div>

        {tab === "categories" && showRestorePrompt && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 p-6 rounded-xl mb-6 text-center shadow-lg">
            <p className="text-lg font-bold text-gray-800 mb-4">
              🛒 Cart में पहले से Items जुड़े हुए हैं।<br />
              क्या आप जारी रखना चाहते हैं या नया Order शुरू करें?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => {
                  setShowRestorePrompt(false);
                  setTab("review");
                  showToast("✅ Welcome back!");
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
              >
                ✅ जारी रखें
              </button>
              <button
                onClick={() => {
                  resetCart();
                  setShowRestorePrompt(false);
                  setTab("categories");
                  showToast("🧹 नया Order शुरू किया गया");
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
              >
                🧹 नया शुरू करें
              </button>
            </div>
          </div>
        )}

        {tab === "categories" && (
          <>
            <div className="sticky top-[80px] z-30 bg-gray-50 pb-3">
              <input
                type="text"
                placeholder="🔍 Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md mx-auto mb-0 px-6 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <ProductGrid items={filteredProducts} cart={cart} onAdd={handleAdd} />

            {cart.length > 0 && (
              <button
                onClick={() => setTab("review")}
                className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition"
              >
                🛒 {cart.length}
              </button>
            )}
          </>
        )}

        {tab === "review" && (
          cart.length === 0 ? (
            <div className="text-center mt-10">
              <p className="text-gray-500 mb-4">🛒 Cart खाली है। कृपया Items जोड़ें।</p>
              <button
                onClick={() => setTab("categories")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full shadow-md transition"
              >
                ➕ Add Items
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
                📝 आपके द्वारा चुने गए आइटम — कृपया मात्रा जोड़ें
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
          )
        )}

        {toast && <OrderToast message={toast} />}

      </div>
    </div>
  );
}
