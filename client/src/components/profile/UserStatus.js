import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";

export default function UserStatus(props) {
  
  return (
    <div className={classes.userStatusContainer}>
      <div className={classes.userNameContainer}>
        <h3>Kendall</h3>
        <h4>Status: <strong>Sloth!</strong></h4>
      </div>
      <img src="https://image.flaticon.com/icons/svg/427/427518.svg" alt="Freepik sloth from https://www.flaticon.com"/>
    </div>
  );
};