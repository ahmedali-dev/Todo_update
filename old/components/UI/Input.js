import React, {useRef} from "react";

const Input = React.forwardRef(({label, error, ...props}, ref) => {
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input id={label} {...props} ref={ref}/>
            <p>{error}</p>
        </>
    );
});

export default Input;
