import React, { HTMLAttributes } from "react";
import { Navigation } from "../navigation";

import "./style.css";

export const Layout: React.FC<
  HTMLAttributes<HTMLDivElement> & { title: string }
> = ({ title, ...props }) => {
  return (
    <div className="root">
      <head>
        <title>{`${title} | DOT Hiring Challenge`}</title>
      </head>
      <Navigation />
      <div {...props} className="layout">
        {props.children}
      </div>
    </div>
  );
};
