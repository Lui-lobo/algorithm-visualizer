import React from "react";

interface BarProps {
  height: number;
  isActive?: boolean;
}

export const Bar: React.FC<BarProps> = ({ height, isActive }) => (
  <div
    className={`w-2 rounded-sm ${
      isActive ? "bg-indigo-400" : "bg-gray-600"
    } transition-all duration-100 ease-in-out`}
    style={{ height: `${height * 3}px` }}
  ></div>
);
