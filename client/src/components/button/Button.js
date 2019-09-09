import React from "react";
import classes from "./Button.module.scss";
import "./Button.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faMinus,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

const classNames = require("classnames");

export default function Button(props) {
  let innerContent = props.innerContent;

  const buttonClass = classNames(
    classes.button,
    props.add ? classes.buttonAdd : "",
    props.formRemove ? classes.buttonFormRemove : "",
    props.next ? classes.buttonNext : "",
    props.back ? classes.buttonBack : "",
    props.backForm ? classes.buttonBackForm : "",
    props.submit ? classes.buttonSubmit : "",
    props.wide ? classes.buttonWide : "",
    props.smallCircle ? classes.buttonSmallCircle : ""
  );

  innerContent = props.add
    ? (innerContent = (
        <FontAwesomeIcon className={classes.navIcon} icon={faPlus} />
      ))
    : innerContent;
  innerContent = props.back
    ? (innerContent = (
        <FontAwesomeIcon className={classes.navIcon} icon={faBackward} />
      ))
    : (innerContent = props.backForm
        ? (innerContent = (
            <FontAwesomeIcon className={classes.navIcon} icon={faBackward} />
          ))
        : innerContent);
  innerContent = props.next
    ? (innerContent = (
        <FontAwesomeIcon className={classes.navIcon} icon={faForward} />
      ))
    : innerContent;
  innerContent = props.formRemove
    ? (innerContent = (
        <FontAwesomeIcon className={classes.navIcon} icon={faMinus} />
      ))
    : innerContent;

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
