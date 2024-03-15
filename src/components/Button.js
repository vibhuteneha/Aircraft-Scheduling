function Button({children,...props}) {
    return (
        <button className="buttons" {...props}>
            {children}
        </button>
    );
}

export default Button;