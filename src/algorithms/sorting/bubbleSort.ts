export function* bubbleSort(arr: number[]) {
  const a = [...arr];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      
      // yield comparison state
      yield {
        array: [...a],
        compare: [j, j + 1],
        swap: null
      };

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];

        // yield swap state
        yield {
          array: [...a],
          compare: [j, j + 1],
          swap: [j, j + 1]
        };
      }
    }
  }

  // final sorted state
  yield {
    array: [...a],
    compare: [],
    swap: []
  };
}
