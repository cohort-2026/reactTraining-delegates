
function Button({ variant="primary", size="md", onClick, children }) {
    return(
        <>
            <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
                {children}
            </button>
        </>
    )
}

export default Button;