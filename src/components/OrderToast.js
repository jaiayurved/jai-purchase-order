
import React from 'react';

export default function OrderToast({ message }) {
  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 30,
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#000',
      color: '#fff',
      padding: '8px 16px',
      borderRadius: 20,
      fontSize: 14,
      zIndex: 1000
    }}>
      {message}
    </div>
  );
}
