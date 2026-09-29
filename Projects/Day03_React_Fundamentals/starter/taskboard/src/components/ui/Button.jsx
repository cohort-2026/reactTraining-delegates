function Button({ variant = "primary", size = "md", children }) {
    return <button className={`button button-${variant} button-${size}`}>{children}</button>;
}
export default Button