
function Button({ variant = "primary", size = "medium", children }) {
  return (
    <button className={`btn-${variant} btn-${size}`}>
      {children}
    </button>
  );
}

export default Button;