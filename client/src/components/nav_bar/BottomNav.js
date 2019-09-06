import React from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faPlusCircle, faUserAlt, faTasks, faDollarSign } from '@fortawesome/free-solid-svg-icons'

const classNames = require('classnames');

export default function BottomNav({ Link }) {
  const bottomNavClass = classNames(classes.nav, classes.bottomNav);

  return (
    <nav className={bottomNavClass}>
      <span>
        <Link to={`/profile`}><FontAwesomeIcon className={classes.navIcon} icon={faUserAlt} /></Link>
        <Link to={`/commitments`}><FontAwesomeIcon className={classes.navIcon} icon={faTasks} /></Link>
      </span>
      <Link to={`/commitments/new`} className={classes.newCommitButton}><FontAwesomeIcon className={classes.newCommitIcon} icon={faPlusCircle} /></Link>
      <span>
        <Link to={`/transactions`}><FontAwesomeIcon className={classes.navIcon} icon={faDollarSign} /></Link>
        <Link to={`/notifications`}><FontAwesomeIcon className={classes.navIcon} icon={faBell} /></Link>
      </span>
    </nav>
  );
}