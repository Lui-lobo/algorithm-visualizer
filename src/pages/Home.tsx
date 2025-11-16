// src/pages/Home.tsx
import React from "react";

export const Home: React.FC = () => {
  return (
    <section className="text-center mt-12">
      <h2 className="text-3xl font-bold mb-4 text-indigo-400">Welcome to Algorithm Visualizer</h2>
      <p className="text-gray-400 mb-8">
        Explore sorting, pathfinding, and data structure algorithms with interactive visualizations.
      </p>
      <div className="flex justify-center space-x-6">
        <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition">
          Sorting Visualizer
        </button>
        <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition">
          Pathfinding Visualizer
        </button>
      </div>
    </section>
  );
};
