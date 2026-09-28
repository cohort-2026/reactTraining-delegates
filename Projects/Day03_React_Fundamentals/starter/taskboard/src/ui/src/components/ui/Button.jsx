function Button({
  variant = "primary",
  size = "md",
  children,
}) {
  const className = `btn btn-${variant} btn-${size}`;

  return (
    <button className={className}>
      {children}
    </button>
  );
}

export default Button;