function Button({ variant = "primary", children, onClick }) {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;

