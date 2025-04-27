// src/components/WelcomeScreen.js
import React, { useEffect, useState } from 'react';

export default function WelcomeScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500); // Start fade before exit
    const exitTimer = setTimeout(() => onFinish(), 2500); // Exit after 3s
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(exitTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`h-screen w-full flex flex-col items-center justify-center bg-blue-100 transition-opacity duration-500 ease-in-out ${
        fadeOut ? 'opacity-0' : 'opacity-500'
      }`}
    >
      <img
        src="/logo.png"
        alt="App Logo"
        className="w-48 h-48 mb-6 animate-pulse"
      />
      <h1 className="text-4xl font-bold text-blue-800 animate-bounce">
        Welcome to JAI Ayurvedic 
      </h1>
    </div>
  );
}
