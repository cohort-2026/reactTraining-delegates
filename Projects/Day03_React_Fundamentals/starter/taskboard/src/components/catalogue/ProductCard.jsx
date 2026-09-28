import Card from '../ui/Card'

function ProductCard({ name, price, inStock }) {
  return (
    <Card title={name}>
      <p>R{price}</p>
      {!inStock && (
        <span
          style={{
            background: '#fee2e2',
            color: '#991b1b',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.85rem',
          }}
        >
          Out of stock
        </span>
      )}
    </Card>
  )
}

export default ProductCard