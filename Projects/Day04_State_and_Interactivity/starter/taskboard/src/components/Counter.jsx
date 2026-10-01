import { useState } from "react";

export default function Counter({ initial = 0, step = 1 }) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);
  const reset = () => setCount(initial);
  const addThree = () => {
    // Updater form: each call sees the latest queued value, so this adds 3
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
  };

  return (
    <section className="exercise">
      <h3>Counter</h3>
      <p>Count: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={addThree}>+3</button>
      <button onClick={reset}>Reset</button>
    </section>
  );
}