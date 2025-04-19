// App.js - Updated to support Dealer Login Code

import React, { useState, useEffect } from "react";
import products from "./data/products";

import WelcomeScreen from "./components/WelcomeScreen";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import CategoryTabs from "./components/CategoryTabs";
import ProductGrid from "./components/ProductGrid";
import CartReview from "./components/CartReview";
import OrderToast from "./components/OrderToast";
import NewDealerForm from "./components/NewDealerForm";

import useToast from "./hooks/useToast";
import useCart from "./hooks/useCartLogic";
import useDealer from "./hooks/useDealerLogic";

import buildWhatsappMessage from "./utils/buildWhatsappMessage";
import "./styles/styles.css";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [dealerCode, setDealerCode] = useState("");
  const [dealerPhone, setDealerPhone] = useState(null);
  const dealer = useDealer(dealerPhone);

  const [tab, setTab] = useState("categories");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Churna");
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
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (dealer && cart.length > 0) {
      const updatedFavorites = [...new Set([...(dealer.Favorites || []), ...cart.map(item => item.name)])];
      dealer.Favorites = updatedFavorites;
      console.log("⭐ Updated Favorites for dealer:", updatedFavorites);
    }
  }, [cart, dealer]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (storedCart.length > 0) setShowRestorePrompt(true);
  }, []);

  const handleSubmit = () => {
    const hasQty = cart.every(item => qty[item.name] && qty[item.name] > 0);
    if (!hasQty) {
      showToast("⚠️कृपया आइटम की मात्रा दर्ज करे ");
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

  if (showWelcome) return <WelcomeScreen onFinish={() => setShowWelcome(false)} />;

  if (!dealerPhone) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-4">🔑 Enter Dealer Login Code</h1>
        <input
          type="text"
          placeholder="Enter your code (e.g., JAI123)"
          value={dealerCode}
          onChange={(e) => setDealerCode(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full max-w-xs"
        />
        <button
          onClick={() => setDealerPhone(dealerCode)}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded"
        >
          ✅ Login
        </button>
      </div>
    );
  }

  if (!dealer && dealerPhone) {
    return <NewDealerForm phone={dealerPhone} onRegister={(d) => alert("✅ Registered! Please refresh to continue.")} />;
  } onRegister={(d) => alert("✅ Registered! Please refresh to continue.")} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {tab !== "review" && <Header dealerName={dealer?.["Dealer Name"]} />}

        {showRestorePrompt && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 p-4 rounded mb-6 text-center shadow">
            <p className="mb-2">🛒 You have an unfinished order. Continue or start fresh?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowRestorePrompt(false);
                  setTab("review");
                  showToast("✅ Welcome back!");
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >✅ Continue</button>
              <button
                onClick={() => {
                  resetCart();
                  setShowRestorePrompt(false);
                  setTab("categories");
                  showToast("🧹 Order cleared. Starting fresh.");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >🧹 Start Fresh</button>
            </div>
          </div>
        )}

        <Navigation tab={tab} setTab={setTab} cartCount={cart.length} />

        {tab === "categories" && (
          <>
            <CategoryTabs currentCategory={selectedCategory} onSelect={setSelectedCategory} />
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
            <div className="text-center text-sm text-gray-400 mt-4 animate-pulse">
              ⬇️ Scroll down for more products ⬇️
            </div>
            <div className="h-12 w-full bg-gradient-to-t from-gray-50 to-transparent -mt-6 pointer-events-none"></div>
          </>
        )}

        {tab === "favorites" && (
          <>
            <h2 className="text-lg font-semibold mb-4">⭐ Favorites</h2>
            <ProductGrid items={filteredProducts} cart={cart} onAdd={handleAdd} />
          </>
        )}

        {tab === "categories" && cart.length > 0 && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <button
              onClick={() => setTab("review")}
              className="bg-green-600 hover:bg-green-700 hover:animate-pulse text-white font-semibold py-3 px-6 rounded-full shadow-xl text-base transition duration-300"
            >
              🛒 View My Order ({cart.length})
            </button>
          </div>
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
