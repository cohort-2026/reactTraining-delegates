"use client";
import { useState } from "react";

export function PointsStepper({ initialPoints }: { initialPoints: number }) {
  const [points, setPoints] = useState(initialPoints);
  return (
    <div className="stepper">
      <button type="button" aria-label="Decrease points"
        onClick={() => setPoints((p) => Math.max(1, p - 1))}>-</button>
      <span>{points} points</span>
      <button type="button" aria-label="Increase points"
        onClick={() => setPoints((p) => p + 1)}>+</button>
    </div>
  );
}
