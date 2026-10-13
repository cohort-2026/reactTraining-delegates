// TODO (Lab 6.1 step 4): add a ButtonProps type (children is a ReactNode).
function Button({ variant = "primary", size = "md", children }) {
  return <button className={`btn btn-${variant} btn-${size}`}>{children}</button>;
}
export default Button;
