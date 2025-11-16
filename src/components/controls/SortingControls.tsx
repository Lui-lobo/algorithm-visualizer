interface SortingControlsProps {
  size: number;
  speed: number;
  isSorting: boolean;
  isPaused: boolean;
  steps: number;
  currentStep: number;

  onSizeChange: (value: number) => void;
  onSpeedChange: (value: number) => void;
  onReset: () => void;
  onSort: () => void;
  onPause: () => void;
  onStepChange: (step: number) => void;
}

export const SortingControls: React.FC<SortingControlsProps> = ({
  size,
  speed,
  isSorting,
  isPaused,
  steps,
  currentStep,
  onSizeChange,
  onSpeedChange,
  onReset,
  onSort,
  onPause,
  onStepChange,
}) => (
  <div className="flex flex-wrap justify-center items-center gap-4 bg-gray-800 p-4 rounded-lg">

    {/* Array Size */}
    <div className="flex flex-col items-center">
      <label className="text-sm text-gray-400">Array Size</label>
      <input
        type="range"
        min="5"
        max="100"
        value={size}
        disabled={isSorting}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        className="accent-indigo-400"
      />
    </div>

    {/* Speed */}
    <div className="flex flex-col items-center">
      <label className="text-sm text-gray-400">Speed (ms)</label>
      <input
        type="range"
        min="10"
        max="500"
        value={speed}
        disabled={isSorting && !isPaused}   // <-- FIX HERE
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        className="accent-indigo-400"
      />
    </div>

    {/* Play / Pause */}
    {!isSorting || isPaused ? (
      <button
        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition disabled:opacity-50"
        onClick={onSort}
      >
        {isPaused ? "Resume" : "Start Sort"}
      </button>
    ) : (
      <button
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-semibold transition"
        onClick={onPause}
      >
        Pause
      </button>
    )}

    {/* Reset */}
    <button
      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition disabled:opacity-50"
      onClick={onReset}
      disabled={isSorting && !isPaused}
    >
      Reset Array
    </button>

    {/* Steps slider */}
    {steps > 0 && (
      <div className="flex flex-col items-center w-full mt-2">
        <label className="text-sm text-gray-400">Steps</label>
        <input
          type="range"
          min="0"
          max={steps - 1}
          value={currentStep}
          disabled={!isPaused}
          onChange={(e) => onStepChange(Number(e.target.value))}
          className="w-full accent-indigo-400"
        />
      </div>
    )}
  </div>
);
