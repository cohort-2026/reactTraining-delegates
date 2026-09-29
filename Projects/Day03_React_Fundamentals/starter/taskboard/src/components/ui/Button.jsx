function Button({ variant = "primary", size, children }) {
    return <button className={"btn" + variant} >{children}</button>;
}
export default Button;