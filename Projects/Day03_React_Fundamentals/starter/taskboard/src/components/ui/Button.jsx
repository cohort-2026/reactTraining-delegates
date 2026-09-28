function Button({ children, variant = 'primary', type = 'button', onClick }) {
  const styles = {
    primary: { background: '#2563eb', color: 'white' },
    secondary: { background: '#e5e7eb', color: '#111827' },
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        ...styles[variant],
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

export default Button