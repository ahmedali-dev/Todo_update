import React, {useRef} from "react";

const Input = React.forwardRef(({label, error, classname, ...props}, ref) => {
    return (
        <div className={classname}>
            <label htmlFor={label}>{label}</label>
            <input id={label} {...props} ref={ref}/>
            <p>{error}</p>
        </div>
    );
});

export default Input;
