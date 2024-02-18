import { HTMLAttributes } from "react";

import "./style.css";

export const Text: React.FC<HTMLAttributes<HTMLSpanElement>> = (props) => {
  return (
    <span {...props} className="text">
      {props.children}
    </span>
  );
};
