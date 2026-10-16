import { useState } from 'react';

export default function Exam1() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(5);

  // Derived from state, NOT separate state
  const reached = count >= target;
  const status = reached ? 'Target reached' : count === 0 ? 'Not started' : 'In progress';

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => Math.max(0, c - 1));
  const reset = () => setCount(0);

  // Two queued functional updates
  const addTwo = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  const changeTarget = (e) => {
    const n = Number(e.target.value);
    setTarget(Number.isNaN(n) ? 1 : Math.max(1, n));
  };

  return (
    <main>
      <h1>Study Session Task Counter</h1>
      <label>
        Target tasks:{' '}
        <input type="number" min="1" value={target} onChange={changeTarget} />
      </label>
      <h2>Completed: {count} / {target}</h2>
      <p><strong>Status:</strong> {status}</p>

      <button onClick={increment} disabled={reached}>Increment</button>
      <button onClick={addTwo} disabled={reached}>Plus two</button>
      <button onClick={decrement} disabled={count === 0}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </main>
  );
}