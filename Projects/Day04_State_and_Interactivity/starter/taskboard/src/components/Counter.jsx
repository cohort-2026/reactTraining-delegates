import {useState} from "react";
function Counter() {
  const [count, setCount] = useState(0);

  const onIncrement = () => {
    setCount((c) => c + 1);
  };

  const onDecrement = () => {
    setCount((c) => c - 1);
  };

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
export default Counter;