import React from "react";
import classes from "./Button.module.scss";
import "./Button.module.scss";

const classNames = require("classnames");

export default function Button(props) {
  const buttonClass = classNames(
    classes.button,
    props.add ? classes.buttonAdd : "",
    props.wide ? classes.buttonWide : "",
    props.smallCircle ? classes.buttonSmallCircle : ""
  );

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.innerContent}
    </button>
  );
}
