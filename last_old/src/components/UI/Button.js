import React, {useRef} from "react";

const Button = React.forwardRef(({text, classname, ...props}, ref) => {
    return (
        <div className={classname}>
            <button {...props} ref={ref}>
                {text}
            </button>
        </div>
    );
});

export default Button;
