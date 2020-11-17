import * as React from 'react';

function useCounter(initialCount = 0) {
  const [count, setCount] = React.useState(initialCount);
  const initialCountRef = React.useRef(initialCount);

  React.useEffect(() => {
    initialCountRef.current = initialCount;
  });

  const increment = React.useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);
  const decrement = React.useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);
  const reset = React.useCallback(() => {
    const initializer = initialCountRef.current;
    setCount(typeof initializer === 'function' ? initializer() : initializer);
  }, []);

  return [count, increment, decrement, reset];
}

export default useCounter;
