import { useState } from "react";
import "./App.css";

import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import { tasks } from "./data/tasks.js";
import ThemeToggle from "./components/ThemeToggle";
import Counter from "./components/Counter.jsx";
import Accordion from "./components/Accordion.jsx";

import Cart from "./components/catalogue/Cart.jsx";
import ProductGrid from "./components/catalogue/ProductGrid.jsx";

import { products } from "./components/catalogue/products.js";

// TODO (Lab 4.1): render Counter, ThemeToggle and Accordion here while you work on the lab.
// TODO (Lab 4.2): render <Shop /> here while you work on the lab.
// TODO (Lab 4.3 step 1): move tasks into useState, importing the data as { tasks as initialTasks }.
// TODO (Lab 4.3 steps 2-6): add the add, status change, rename and delete handlers, render AddTaskForm,
//   and pass the handlers down to Board.
function App() {
  const [openIds, setOpenIds] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (productId) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { productId, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.productId !== productId),
    );
  };

  const toggleAccordion = (id) => {
    setOpenIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((currentId) => currentId !== id)
        : [...currentIds, id],
    );
  };

  const showAll = () => {
    setOpenIds(["react", "state", "props"]);
  };

  const hideAll = () => {
    setOpenIds([]);
  };

  return (
    <>
      <Header tasks={tasks} />
      <Board tasks={tasks} />

      <ThemeToggle />
      <Counter />

      <ProductGrid products={products} onAddToCart={addToCart} />

      <Cart
        cart={cart}
        products={products}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
      />

      <h2>Accordion</h2>

      <button onClick={showAll}>Show All</button>
      <button onClick={hideAll}>Hide All</button>

      <Accordion
        id="react"
        title="What is React?"
        content="React is a JavaScript library for building user interfaces."
        isOpen={openIds.includes("react")}
        onToggle={() => toggleAccordion("react")}
      />

      <Accordion
        id="state"
        title="What is useState?"
        content="useState allows a component to store and update state."
        isOpen={openIds.includes("state")}
        onToggle={() => toggleAccordion("state")}
      />

      <Accordion
        id="props"
        title="What are props?"
        content="Props allow a parent component to pass data to a child."
        isOpen={openIds.includes("props")}
        onToggle={() => toggleAccordion("props")}
      />
    </>
  );
}
export default App;
