// Lab 4.1: Counter with bounded decrement and updater-based increments.
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handlePlus() {
    setCount((currentCount) => currentCount + 1);
  }

  function handleMinus() {
    setCount((currentCount) => Math.max(0, currentCount - 1));
  }

  function handlePlusFive() {
    for (let index = 0; index < 5; index++) {
      setCount((currentCount) => currentCount + 1);
    }
  }

  return (
    <div className="counter">
      <p>Count: {count}</p>
      <button onClick={handleMinus}>Minus</button>
      <button onClick={handlePlus}>Plus</button>
      <button onClick={handlePlusFive}>Plus 5</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;