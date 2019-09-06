import React from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const classNames = require('classnames');

export default function TopNav(props) {
  const topNavClass = classNames(classes.nav, classes.topNav);

  const toggleActive = () => {

  }

  return (
    <nav className={topNavClass}>
      <img className={classes.logo} src="/images/hands_together.svg" alt="Teamwork by Pham Duy Phuang Hung of the Noun Project"/>
      <h3>{document.title}</h3>
      <button className={classes.settingsHamburger} onClick={toggleActive}><FontAwesomeIcon className={classes.settingsHamburgerIcon} icon={faBars} /></button>
    </nav>
  );
}