import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handlePlusFive() {
    for (let index = 0; index < 5; index++) {
      setCount((current) => current + 1);
    }
  }

  return (
    <div className="counter">
      <p>Count: {count}</p>
      <button onClick={() => setCount((current) => Math.max(0, current - 1))}>
        Minus
      </button>
      <button onClick={() => setCount((current) => current + 1)}>Plus</button>
      <button onClick={handlePlusFive}>Plus 5</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;