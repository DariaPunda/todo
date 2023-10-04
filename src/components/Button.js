import React from "react";

const Button = (props) => {
  return (
    <button
      type="button"
      className={`${props.className} btn  mt-2`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
