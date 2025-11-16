import React from "react";
import { SortingVisualizer } from "../components/visualizer/SortingVisualizer";

export const SortingPage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">Sorting Visualizer</h1>
      <SortingVisualizer />
    </div>
  );
};
