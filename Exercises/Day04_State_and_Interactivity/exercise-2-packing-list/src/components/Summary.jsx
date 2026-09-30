import { useState } from "react";

function Summary({ items }) {
  const total = items.length;
  const packedCount = items.filter((item) => item.packed).length;

  return (
    <p className="summary">
      {packedCount} of {total} packed
    </p>
  );
}

export default Summary;
