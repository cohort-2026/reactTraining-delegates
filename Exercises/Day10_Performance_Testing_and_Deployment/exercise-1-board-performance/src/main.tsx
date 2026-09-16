import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Board } from "./components/Board";
import { sampleTasks } from "./sampleTasks";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Board initialTasks={sampleTasks} />
  </StrictMode>
);
