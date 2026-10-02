type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
};

function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
