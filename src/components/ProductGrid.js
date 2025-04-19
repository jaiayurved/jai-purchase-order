// ProductGrid.js (Hybrid variant logic)
import React from 'react';

const groupByVariant = (items) => {
  const groups = {};
  items.forEach((item) => {
    const key = item.variantOf || item.name.split(/\s+/)[0];
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return Object.entries(groups);
};

export default function ProductGrid({ items, cart, onAdd }) {
  const groupedItems = groupByVariant(items);

  return (
    <div className="px-2 sm:px-4 space-y-6">
      {groupedItems.map(([baseName, variants], idx) => (
        <div key={idx}>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{baseName}</h3>
          <div className="flex overflow-x-auto gap-4 pb-2">
            {variants.map((item, i) => (
              <div
                key={i}
                className="min-w-[250px] bg-white border border-blue-100 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all"
              >
                <h4 className="text-md font-bold text-gray-800 mb-1">{item.name}</h4>
                <p className="text-sm text-gray-400 mb-4">{item.category}</p>

                <button
                  onClick={() => onAdd(item)}
                  disabled={cart.some((i) => i.name === item.name)}
                  className={`w-full py-2 text-sm rounded-xl font-bold transition-all duration-200 shadow-md ${
                    cart.some((i) => i.name === item.name)
                      ? 'bg-blue-300 text-white cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {cart.some((i) => i.name === item.name) ? '✔️ Added' : '➕ Add to Order'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
