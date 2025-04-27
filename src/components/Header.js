import React from 'react';

export default function Header({ dealerName }) {
  return (
<div className="flex justify-between items-center mb-4 px-4">
  <h1 className="text-xl font-bold text-gray-800">🪔 JAI Ayurvedic Orders</h1>
  {dealerName && (
    <p className="text-sm text-gray-600">👤 {dealerName}</p>
  )}
</div>
  );
}
