import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";

const classNames = require('classnames');

export default function CommitmentStatus(props) {
  const commitmentStatus = classNames(classes.statusContainer, classes.statusPill);
  
  return (
    <div className={commitmentStatus}>
      <div className={classes.userNameContainer}>
        <h3>Stakes</h3>
        <p>Uh oh! At this rate it looks like <strong>{Object.keys(props.flakiest)[0]}</strong> {props.stakes.toLowerCase()}. </p>
      </div>
      <img src="https://image.flaticon.com/icons/svg/427/427518.svg" alt="Freepik sloth from https://www.flaticon.com"/>
    </div>
  );
};