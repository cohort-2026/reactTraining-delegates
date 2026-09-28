function Card({ title, children }) {
  return (
    <section
      style={{
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '320px',
        margin: '16px 0',
      }}
    >
      {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
      {children}
    </section>
  )
}

export default Card