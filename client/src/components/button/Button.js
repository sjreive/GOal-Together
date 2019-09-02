import React from "react";
import classes from "./Button.module.scss";
import "./Button.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

const classNames = require('classnames');

export default function Button(props) {
  let innerContent = props.innerContent;

  const buttonClass = classNames(
    classes.button,
    props.add ? classes.buttonAdd : "",
    props.back ? classes.buttonBack : "",
    props.wide ? classes.buttonWide : "",
    props.smallCircle ? classes.buttonSmallCircle : ""
  );

  innerContent = props.back ? innerContent = <FontAwesomeIcon className={classes.navIcon} icon={faBackward} /> : innerContent;

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {innerContent}
    </button>
  );
}