export function* bubbleSort(array: number[]): Generator<number[]> {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield [...arr]; // yield before compare

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield [...arr]; // yield after swap
      }
    }
  }

  return [...arr];
}
