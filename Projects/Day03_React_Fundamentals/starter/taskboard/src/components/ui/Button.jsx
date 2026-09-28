/**
 * Button
 * A reusable button.
 *
 * Props:
 *   variant  — "primary" | "secondary"   (default: "primary")
 *   size     — "sm" | "md" | "lg"        (default: "md")
 *   type     — "button" | "submit" | "reset"  (default: "button")
 *   disabled — boolean
 *   children — the label / content
 */
function Button({
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  children,
  ...rest
}) {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "",                                   // default — no extra classes
    lg: "text-base px-6 py-3",
  };

  const className = `${variants[variant] ?? variants.primary} ${sizes[size] ?? ""}`.trim();

  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;