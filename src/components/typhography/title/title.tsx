import { HTMLAttributes } from "react";

import "./style.css";

export const Title: React.FC<HTMLAttributes<HTMLHeadElement>> = (props) => {
  return (
    <h1 {...props} className="title">
      {props.children}
    </h1>
  );
};
