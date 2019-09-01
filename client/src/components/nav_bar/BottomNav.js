import React from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faPlusCircle, faUserAlt, faTasks, faDollarSign } from '@fortawesome/free-solid-svg-icons'

const classNames = require('classnames');

export default function BottomNav(props) {
  const bottomNavClass = classNames(classes.nav, classes.bottomNav);

  return (
    <nav className={bottomNavClass}>
      <FontAwesomeIcon className={classes.navIcon} icon={faUserAlt} />
      <FontAwesomeIcon className={classes.navIcon} icon={faTasks} />
      <FontAwesomeIcon className={classes.navIcon} icon={faPlusCircle} />
      <FontAwesomeIcon className={classes.navIcon} icon={faDollarSign} />
      <FontAwesomeIcon className={classes.navIcon} icon={faBell} />
    </nav>
  );
}