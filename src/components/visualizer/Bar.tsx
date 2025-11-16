interface BarProps {
  height: number;
  color?: string; // Tailwind color class
}

export const Bar: React.FC<BarProps> = ({ height, color }) => {
  return (
    <div
      className={`
        w-4 
        ${color ?? "bg-indigo-400"}
        rounded-t
        transition-all duration-75
      `}
      style={{ height: `${height * 3}px` }}
    ></div>
  );
};
