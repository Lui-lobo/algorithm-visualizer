import React, { useState, useEffect, useRef } from "react";
import { Bar } from "./Bar";
import { generateRandomArray } from "../../utils/generateArray";
import { bubbleSort } from "../../algorithms/sorting/bubbleSort";
import { SortingControls } from "../controls/SortingControls";

export const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [size, setSize] = useState(20);
  const [speed, setSpeed] = useState(100);

  const [steps, setSteps] = useState<
    { array: number[]; compare: number[]; swap: number[] }[]
  >([]);
  const [currentStep, setCurrentStep] = useState(0);

  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Add the speed memo
  const speedRef = useRef(speed);

  // Refs to hold latest values accessible inside async loops
  const isPausedRef = useRef(false);
  const isSortingRef = useRef(false);

  useEffect(() => {
    resetArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  // keep refs updated whenever state changes
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isSortingRef.current = isSorting;
  }, [isSorting]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  function resetArray() {
    // Stop any running sorting immediately
    stopSortingImmediately();

    const newArr = generateRandomArray(size);
    setArray(newArr);
    setSteps([]);
    setCurrentStep(0);
  }

  function stopSortingImmediately() {
    // Update both state and refs so loops see the cancellation right away
    setIsPaused(false);
    setIsSorting(false);
    isPausedRef.current = false;
    isSortingRef.current = false;
  }

  function prepareAlgorithm(arr: number[]) {
    const generator = bubbleSort(arr);
    const states: { array: number[]; compare: number[]; swap: number[] }[] = [];

    for (let res = generator.next(); !res.done; res = generator.next()) {
      if (res.value) states.push(res.value);
    }

    return states;
  }

  async function startSort() {
    // If already running and not paused, do nothing
    if (isSortingRef.current && !isPausedRef.current) return;

    // If not prepared, prepare steps from current array
    let localSteps = steps;
    if (localSteps.length === 0 || localSteps[0].length === 0) {
      localSteps = prepareAlgorithm(array);
      setSteps(localSteps);
      setCurrentStep(0);
    }

    setIsSorting(true);
    isSortingRef.current = true;
    setIsPaused(false);
    isPausedRef.current = false;

    // Start/resume from currentStep
    for (let i = currentStep; i < localSteps.length; i++) {
      // if paused or stopped, break out immediately
      if (!isSortingRef.current || isPausedRef.current) break;

      setCurrentStep(i);
      setArray(localSteps[i]);

      // Wait 'speed' ms, but allow next loop iteration to check refs after await
      await dynamicWait();
    }

    // If finished naturally (not paused/stopped), mark as stopped
    if (!isPausedRef.current) {
      setIsSorting(false);
      isSortingRef.current = false;
    }
  }

  function pauseSort() {
    setIsPaused(true);
    isPausedRef.current = true;
    // do not set isSorting false here, we keep "isSorting" true so UI knows algorithm was running
    // but visually we can treat isPaused separately
  }

  function jumpTo(step: number) {
    // If steps empty, ignore
    if (!steps || steps.length === 0) return;
    const clamped = Math.max(0, Math.min(step, steps.length - 1));
    setCurrentStep(clamped);
    setArray(steps[clamped]);
  }

  // When user hits Reset while sorting, ensure sorting stops and new array generated
  function handleReset() {
    // Force stop the sorting and then reset array
    setIsPaused(false);
    isPausedRef.current = false;
    setIsSorting(false);
    isSortingRef.current = false;

    const newArr = generateRandomArray(size);
    setArray(newArr);
    setSteps([]);
    setCurrentStep(0);
  }

  function dynamicWait() {
    return new Promise<void>((resolve) => {
      let elapsed = 0;

      const interval = setInterval(() => {
        // stop immediately if sorting has been cancelled
        if (!isSortingRef.current) {
          clearInterval(interval);
          return resolve();
        }

        // stop immediately when paused
        if (isPausedRef.current) {
          clearInterval(interval);
          return resolve();
        }

        elapsed += 10;

        // current speed is ALWAYS retrieved from speedRef
        if (elapsed >= speedRef.current) {
          clearInterval(interval);
          return resolve();
        }
      }, 10);
    });
  }

  const state = steps[currentStep];
  const displayedArray = state ? state.array : array; // fallback for initial render

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <SortingControls
        size={size}
        speed={speed}
        isSorting={isSorting}
        isPaused={isPaused}
        steps={steps.length}
        currentStep={currentStep}
        onSizeChange={(v) => {
          // allow changing size only when not sorting (or when paused)
          if (isSortingRef.current && !isPausedRef.current) return;
          setSize(v);
        }}
        onSpeedChange={(v) => setSpeed(v)}
        onReset={handleReset}
        onSort={startSort}
        onPause={pauseSort}
        onStepChange={jumpTo}
      />

      <div className="flex items-end justify-center gap-1 h-[350px] w-full max-w-4xl bg-gray-800 rounded-lg p-4 shadow-lg">
        {displayedArray.map((value, idx) => {
          let color = "bg-indigo-400";

          if (state) {
            if (state.swap?.includes(idx)) {
              color = "bg-red-500";
            } else if (state.compare?.includes(idx)) {
              color = "bg-yellow-400";
            }
          }

          return <Bar key={idx} height={value} color={color} />;
        })}
      </div>
    </div>
  );
};
