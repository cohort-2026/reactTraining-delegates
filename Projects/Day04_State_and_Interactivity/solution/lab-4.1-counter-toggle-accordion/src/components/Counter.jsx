import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handlePlus() {
    setCount((c) => c + 1);
  }

  function handleMinus() {
    setCount((c) => Math.max(0, c - 1));
  }

  function handlePlusFive() {
    for (let i = 0; i < 5; i++) {
      setCount((c) => c + 1);
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
