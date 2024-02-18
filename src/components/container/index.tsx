import { HTMLAttributes } from "react";

import "./style.css";

export const Container: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className="container">
      {props.children}
    </div>
  );
};
