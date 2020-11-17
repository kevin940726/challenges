# `use-counter`

Implement a `useCounter` React hook that has the following type signature:

```ts
function increment(): void;
function decrement(): void;
function reset(): void;
type InitialCount = number | (() => number);

function useCounter(initialCount: InitialCount = 0): [number, increment, decrement, reset];
```

- [ ] `initialCount` could be a number or a function which lazily evaluated to a number.
- [ ] Calling `increment` will increment the `count` by 1.
- [ ] Calling `decrement` will decrement the `count` by 1.
- [ ] Calling `reset` will reset the `count` to its initial value, and re-evaluate lazily initialized value if needed.
- [ ] Both `increment`, `decrement` and `reset` should be memoized between re-renders.
