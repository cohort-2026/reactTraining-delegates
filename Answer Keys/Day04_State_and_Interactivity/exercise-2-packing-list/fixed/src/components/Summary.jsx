function Summary({ items }) {
  const packedCount = items.filter((item) => item.packed).length;

  return (
    <p className="summary">
      {packedCount} of {items.length} packed
    </p>
  );
}

export default Summary;
