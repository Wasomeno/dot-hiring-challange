import { ReactNode, forwardRef } from "react";

import "./style.css";

export const Input = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { suffix?: ReactNode }
>((props, ref) => {
  return (
    <div className="input__wrapper">
      <input {...props} ref={ref} className="input" />
      {props.suffix && <span className="input__suffix">{props.suffix}</span>}
    </div>
  );
});
