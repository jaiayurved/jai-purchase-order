import React from "react";

export default function PendingOrderList({ orders, onEdit, onPrint }) {
  if (!orders || orders.length === 0) return <p className="text-center">No pending orders.</p>;

  return (
    <div className="space-y-6 px-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white shadow border rounded-xl p-4">
          <div className="mb-2">
            <h3 className="font-bold text-lg">{order.dealer?.["Dealer Name"] || "Unknown Dealer"}</h3>
            <p className="text-sm text-gray-600">📞 {order.dealer?.["Phone Number"]}</p>
            <p className="text-sm text-gray-500">🕒 {order.date}</p>
          </div>

          <ul className="text-sm list-disc ml-4 text-gray-700">
            {order.items.map((item, i) => (
              <li key={i}>{item.name} – {item.qty} pcs</li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-4">
            <span className="bg-yellow-400 text-white text-xs px-3 py-1 rounded-full">
              {order.status || "Pending"}
            </span>

            <div className="flex gap-3">
              <button
                onClick={() => onEdit(order)}
                className="text-sm text-blue-600 underline"
              >
                ✏️ Review & Edit
              </button>
              <button
                onClick={() => onPrint(order)}
                className="text-sm text-green-600 underline"
              >
                🖨 Print
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
