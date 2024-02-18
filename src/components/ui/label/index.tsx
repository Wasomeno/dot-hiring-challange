import "./style.css";

export const Label: React.FC<
  React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
> = (props) => {
  return (
    <label {...props} className="label">
      {props.children}
    </label>
  );
};
