import React, { useState } from 'react';

export default function NewDealerForm({ phone, onRegister }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onRegister({
        "Phone Number": phone,
        "Dealer Name": name,
        "Type": "WLD",
        "WLD Category": "Generic",
        "Favorites": [],
      });
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-xl mt-6">
      <h2 className="text-xl font-bold text-center mb-4">🔐 Register as Dealer</h2>
      <p className="text-sm text-gray-600 mb-2">Phone: {phone}</p>
      <input
        type="text"
        placeholder="Your Name / Firm Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        ✅ Register Me
      </button>
    </div>
  );
}
