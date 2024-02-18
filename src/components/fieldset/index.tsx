import { HTMLAttributes } from "react";

import "./style.css";

export const Fieldset: React.FC<HTMLAttributes<HTMLFieldSetElement>> = (
  props
) => {
  return (
    <fieldset {...props} className="fieldset">
      {props.children}
    </fieldset>
  );
};
