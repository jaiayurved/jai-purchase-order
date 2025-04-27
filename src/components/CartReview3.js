import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from 'react';

export default function CartReview({ cart, qty, onQtyChange, onRemove, onSubmit, setTab }) {
  const [shaking, setShaking] = useState({});
  const inputRefs = useRef({});

  // ✅ Shake and scroll to first missing qty
  useEffect(() => {
    const initialShake = {};
    let firstMissing = null;

    cart.forEach(item => {
      if (!qty[item.name]) {
        initialShake[item.name] = true;
        if (!firstMissing) firstMissing = item.name;
      }
    });

    setShaking(initialShake);

    if (firstMissing && inputRefs.current[firstMissing]) {
      inputRefs.current[firstMissing].scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const timer = setTimeout(() => setShaking({}), 500);
    return () => clearTimeout(timer);
  }, [cart, qty]);

  if (cart.length === 0)
    return <p className="text-center text-gray-600">🛒 No items added.</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-1 px-1 pb-24">
      <h3 className="text-center text-lg font-semibold text-gray-700 border-b pb-2 animate-glow">
        📝 कृपा यहां पर अपनी मात्रा दर्ज करें, फिर सबमिट ऑर्डर बटन दबाएं
      </h3>

      {cart.map((item, i) => (
        <div key={i} className="relative border-b pb-0.5 border-gray-300">
          <h3 className="text-base sm:text-lg font-extrabold text-gray-800 mb-1">{item.name}</h3>

          <div className="flex flex-wrap items-center gap-2">
            {[12, 24, 36, 48, 72, 96].map((n, index) => (
              <motion.button
                key={n}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => onQtyChange(item.name, n)}
                className="bg-blue-100 text-blue-700 text-sm px-2.5 py-1 rounded-full hover:bg-blue-200 transition font-semibold"
              >
                {n}
              </motion.button>
            ))}

            <div className="flex flex-col items-start gap-1 mt-1">
              <input
                ref={(el) => (inputRefs.current[item.name] = el)}
                type="number"
                value={qty[item.name] || ""}
                onChange={(e) => onQtyChange(item.name, parseInt(e.target.value) || "")}
                min="1"
                className={`w-24 px-3 py-2 border-2 rounded text-right font-bold text-lg shadow-sm
                  ${!qty[item.name] ? 'border-red-400 bg-red-50' : 'border-green-400 bg-green-50'}
                  ${shaking[item.name] ? 'shake' : ''}
                `}
              />
              <span className="text-sm text-gray-500 ml-1">pcs</span>
              {!qty[item.name] && (
                <p className="text-red-500 text-sm mt-1 ml-1">⚠️ Please enter qty</p>
              )}
            </div>

            <div className="flex justify-end w-full mt-1">
              <button
                onClick={() => onRemove(item.name)}
                className="text-red-600 hover:text-red-800 text-sm underline"
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Sticky Bottom Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-inner border-t border-gray-200 py-3 px-4 flex justify-center gap-3 z-50">
        <button
          onClick={() => setTab('categories')}
          className="bg-blue-100 text-blue-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-200 transition"
        >
          🔙 Add More Items
        </button>

        <button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-bold text-sm px-5 py-2 rounded-lg shadow-md transition"
        >
          ✅ SUBMIT ORDER
        </button>
      </div>
    </div>
  );
}
