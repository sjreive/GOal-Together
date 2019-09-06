import React, { useState } from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";
import CollapseDropDownList from "./CollapseDropDownList";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


const classNames = require('classnames');

export default function TopNav({ Link, user }) {
  const topNavClass = classNames(classes.nav, classes.topNav);

  const [collapsed, toggleCollapsed] = useState(true);

  return (
    <nav className={topNavClass}>
      <img className={classes.logo} src="/images/hands_together.svg" alt="Teamwork by Pham Duy Phuang Hung of the Noun Project"/>
      <h3>{document.title}</h3>
      <span className={classes.collapseContainer}>
        <button className={classes.settingsHamburger} onClick={e => toggleCollapsed(!collapsed)}><FontAwesomeIcon className={classes.settingsHamburgerIcon} icon={faBars} /></button>
        <CollapseDropDownList collapsed={collapsed} Link={Link} user={user} />
      </span>
    </nav>
  );
}