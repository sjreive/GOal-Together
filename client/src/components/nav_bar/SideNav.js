import React, { useState } from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


export default function SideNav({ Link, user }) {

  return (
    <nav className={classes.sideNav}>
      <div className={classes.sideNavContainer}>
        <img className={classes.logo} src="/images/hands_together.svg" alt="Teamwork by Pham Duy Phuang Hung of the Noun Project"/>
        <h1>{document.title}</h1>
      </div>
    </nav>
  );
}