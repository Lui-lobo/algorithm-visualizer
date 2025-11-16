import { useState, useRef } from "react";

export function useAlgorithmPlayer<T>() {
  const [steps, setSteps] = useState<T[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const iteratorRef = useRef<Generator<T, T, unknown> | null>(null);

  function loadAlgorithm(
    generatorFunction: (array: T[]) => Generator<T, T, unknown>,
    initialArray: T[]
  ) {
    const iterator = generatorFunction([...initialArray]);
    iteratorRef.current = iterator;

    const recordedSteps: T[] = [];

    let result = iterator.next();
    while (!result.done) {
      recordedSteps.push(result.value);
      result = iterator.next();
    }

    recordedSteps.push(result.value);

    setSteps(recordedSteps);
    setCurrentStep(0);
  }

  function play() {
    setIsPlaying(true);
    stepForward();
  }

  function pause() {
    setIsPlaying(false);
  }

  function stepForward() {
    if (!isPlaying) return;

    setCurrentStep((prev) => {
      if (prev < steps.length - 1) return prev + 1;

      setIsPlaying(false);
      return prev;
    });

    setTimeout(stepForward, 150);
  }

  function jumpToStep(index: number) {
    setCurrentStep(index);
  }

  return {
    steps,
    currentStep,
    isPlaying,
    play,
    pause,
    jumpToStep,
    loadAlgorithm
  };
}
