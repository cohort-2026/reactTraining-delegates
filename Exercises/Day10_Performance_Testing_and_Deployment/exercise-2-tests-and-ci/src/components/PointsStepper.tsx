type Props = { value: number; onChange: (next: number) => void };

export function PointsStepper({ value, onChange }: Props) {
  return (
    <div>
      <button type="button" aria-label="Decrease points"
        onClick={() => onChange(value - 1)}>-</button>
      <span>{value} points</span>
      <button type="button" aria-label="Increase points"
        onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}
