import React from "react";

import "./style.css";

export const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = (props) => {
  return (
    <button {...props} className="button">
      {props.children}
    </button>
  );
};
