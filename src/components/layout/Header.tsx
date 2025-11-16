// src/components/layout/Header.tsx
import React from "react";

export const Header: React.FC = () => (
  <header className="bg-gray-800 border-b border-gray-700 shadow-md">
    <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
      <h1 className="text-xl font-bold text-indigo-400">Algorithm Visualizer</h1>
      <nav className="space-x-6 text-sm">
        <a href="#" className="hover:text-indigo-300 transition">Home</a>
        <a href="#" className="hover:text-indigo-300 transition">Sorting</a>
        <a href="#" className="hover:text-indigo-300 transition">Pathfinding</a>
      </nav>
    </div>
  </header>
);
