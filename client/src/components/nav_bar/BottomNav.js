import React from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";

const classNames = require('classnames');

export default function BottomNav(props) {
  const bottomNavClass = classNames(classes.nav, classes.bottomNav);

  return (
    <nav className={bottomNavClass}>
      <h3>{document.title}</h3>
    </nav>
  );
}