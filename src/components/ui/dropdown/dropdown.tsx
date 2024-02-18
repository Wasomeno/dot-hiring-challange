import { ReactNode } from "react";

type DropdownProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: ReactNode;
};

type DropdownItemProps = {
  label: string;
  onClick: () => void;
};

export function Dropdown(props: DropdownProps) {
  return (
    props.isOpen && (
      <>
        <div
          onClick={() => props.onOpenChange(false)}
          style={{
            position: "absolute",
            zIndex: "5",
            width: "100vw",
            height: "100vh",
            visibility: "hidden",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 70,
            zIndex: "10",
            display: "flex",
            flexDirection: "column",
            opacity: props.isOpen ? "1" : "0",
            border: "1px solid lightGray",
            borderRadius: "8px",
            width: "20rem",
            backgroundColor: "white",
            boxShadow: "0 3px 10px rgb(0,0,0,0.2)",
          }}
        >
          {props.children}
        </div>
      </>
    )
  );
}

const DropdownItem = (props: DropdownItemProps) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      style={{
        border: "none",
        background: "none",
        padding: "0.6rem 0.75rem",
        cursor: "pointer",
        textAlign: "start",
        fontFamily: "monospace",
      }}
    >
      {props.label}
    </button>
  );
};

Dropdown.Item = DropdownItem;
