import React from 'react';

export default function Header({ dealerName }) {
  return (
    <div className="text-center mb-4">
      

      <h1 className="text-xl sm:text-1xl font-bold text-gray-400 mb-1 flex justify-center items-center gap-1">
        🪔 <div className="border-l border-gray-400 h-6"></div> <span>Jai ayurvedic sales Order App</span>
      </h1>

      {dealerName && (
        <p className="text-sm text-gray-600">👋 Welcome, <span className="font-medium text-black">	{"Dealer"}</span></p>
      )}

      <hr className="mt-4 border-t-2 border-dashed border-gray-300" />
      <p className="text-xs text-gray-500 mt-1 italic">⬇️ Scroll down for more products</p>
    </div>
  );
}
