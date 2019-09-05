import React from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";

const classNames = require('classnames');

export default function GeneralPill(props) {
  const generalPill = classNames(classes.statusContainer, classes.generalPill);
  
  return (
    <div className={generalPill}>
      <h3>{props.header}</h3>
      <p>{props.body}</p>
    </div>
  );
};