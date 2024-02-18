import React from "react";

import "./style.css";

export const ShippingCostCheckerForm: React.FC<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >
> = (props) => {
  return (
    <form {...props} className="shipping-cost-checker-form">
      {props.children}
    </form>
  );
};
