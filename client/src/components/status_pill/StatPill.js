import React from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";

const classNames = require('classnames');

export default function StatPill(props) {
  const generalPill = classNames(classes.statusContainer, classes.statPill);
  
  return (
    <div className={generalPill}>
      <h3>{props.header}:</h3>
      <h4><strong>{props.score}</strong></h4>
    </div>
  );
};