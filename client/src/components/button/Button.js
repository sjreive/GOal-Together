import React from "react";
import classes from "./Button.module.scss";
import "./Button.module.scss";

const classNames = require('classnames');

export default function BottomNav({ onClick, disabled, add, innerContent, wide, smallCircle }) {
  const buttonClass = classNames("button", {
    "button--wide": wide,
    "button--small-circle": smallCircle,
    "button--add": add
  });

  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {innerContent}
    </button>
  );
}