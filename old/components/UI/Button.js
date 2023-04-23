import React, { useRef } from "react";

const Button = React.forwardRef(({ text, ...props }, ref) => {
  return (
    <div>
      <button {...props} ref={ref}>
        {text}
      </button>
    </div>
  );
});

export default Button;
