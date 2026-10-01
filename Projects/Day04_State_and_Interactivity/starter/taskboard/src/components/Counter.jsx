import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((c) => c + 1);
  };

  const decrease = () => {
    setCount((c) => Math.max(0, c - 1));
  };

  const reset = () => {
    setCount(0);
  };

  const plusFive = () => {
    for (let i = 0; i < 5; i++) {
      setCount((c) => c + 1);
    }
  };

  return (
    <div>
      <h2>Counter</h2>

      <p>{count}</p>

      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={plusFive}>Plus 5</button>
    </div>
  );
}

export default Counter;
