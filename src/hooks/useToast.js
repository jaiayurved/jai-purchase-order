
import { useState } from 'react';

export default function useToast() {
  const [toast, setToast] = useState('');

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2000);
  };

  return { toast, showToast };
}
