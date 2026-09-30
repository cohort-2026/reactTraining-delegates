function Summary({ items }) {
  // Derive the total so it stays in sync when items are added or deleted.
  const total = items.length;
  const packedCount = items.filter((item) => item.packed).length;

  return (
    <p className="summary">
      {packedCount} of {total} packed
    </p>
  );
}

export default Summary;
