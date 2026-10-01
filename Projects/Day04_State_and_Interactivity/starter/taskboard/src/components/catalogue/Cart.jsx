export default function Cart({ cart, products }) {
  const cartItems = cart.map(c => {
    const prod = products.find(p => p.id === c.id)
    return { ...prod, qty: c.qty }
  })

  const total = cartItems.reduce((sum, item) => sum + (item?.price || 0) * item.qty, 0)
  const count = cartItems.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', height: 'fit-content' }}>
      <h2>Cart ({count} items) - R {total}</h2>
      {cartItems.length === 0 && <p>Cart empty</p>}
      {cartItems.map(item => (
        <div key={item.id} style={{ marginBottom: '8px' }}>
          {item?.name} x {item.qty} = R {item?.price * item.qty}
        </div>
      ))}
    </div>
  )
}