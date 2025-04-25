// components/EditableOrderReview.js

import React, { useState, useEffect } from "react";

export default function EditableOrderReview({
  order,
  onSave,
  onCancel
}) {
  const [editedItems, setEditedItems] = useState([]);

  useEffect(() => {
    if (order?.items) {
      setEditedItems(order.items.map(item => ({
        ...item,
        batch: item.batch || "",
        mfg: item.mfg || "",
        exp: item.exp || "",
        discount: item.discount || 0
      })));
    }
  }, [order]);

  const handleChange = (index, field, value) => {
    const updated = [...editedItems];
    updated[index][field] = value;
    setEditedItems(updated);
  };

  const handleSave = () => {
    const updatedOrder = { ...order, items: editedItems, status: "Ready" };
    onSave(updatedOrder);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 text-center">📦 Edit Pending Order</h2>
      {editedItems.map((item, i) => (
        <div key={i} className="border-b border-gray-200 pb-3 mb-3">
          <div className="font-bold text-gray-700">{item.name}</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-sm">
            <input
              type="text"
              className="border px-2 py-1 rounded"
              placeholder="Batch"
              value={item.batch}
              onChange={(e) => handleChange(i, "batch", e.target.value)}
            />
            <input
              type="text"
              className="border px-2 py-1 rounded"
              placeholder="MFG"
              value={item.mfg}
              onChange={(e) => handleChange(i, "mfg", e.target.value)}
            />
            <input
              type="text"
              className="border px-2 py-1 rounded"
              placeholder="EXP"
              value={item.exp}
              onChange={(e) => handleChange(i, "exp", e.target.value)}
            />
            <input
              type="number"
              className="border px-2 py-1 rounded"
              placeholder="Discount %"
              value={item.discount}
              onChange={(e) => handleChange(i, "discount", e.target.value)}
            />
          </div>
        </div>
      ))}

      <div className="flex justify-center gap-4">
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">💾 Save</button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">❌ Cancel</button>
      </div>
    </div>
  );
}
