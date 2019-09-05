import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";

const classNames = require('classnames');

export default function CommitmentStatus(props) {
  const commitmentStatus = classNames(classes.statusContainer, classes.statusPill);
  
  return (
    <div className={classes.statusContainer}>
      <div className={classes.userNameContainer}>
        <h3>Liz</h3>
        <h4>Status: <strong>Sloth!</strong></h4>
      </div>
      <img src="https://image.flaticon.com/icons/svg/427/427518.svg" alt="Freepik sloth from https://www.flaticon.com"/>
    </div>
  );
};