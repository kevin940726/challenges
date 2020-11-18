import * as React from 'react';

function useCounter(initialCount = 0) {
  const initRef = React.useRef(initialCount);
  React.useEffect(() => {
    initRef.current = initialCount;
  }, [initialCount]);
  const [value, setValue] = React.useState(initRef.current);
  const increment = React.useCallback(() => setValue((v) => v + 1), []);
  const decrement = React.useCallback(() => setValue((v) => v - 1), []);
  // assume `initialCount` will always be `number` or `() => number`
  const reset = React.useCallback(() => setValue(initRef.current), []);
  return [value, increment, decrement, reset];
}

export default useCounter;
