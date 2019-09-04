import React from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";

const classNames = require('classnames');

export default function Tab(props) {
  const topNavClass = classNames(classes.nav, classes.topNav);
  return (
    <nav className={topNavClass}>
      <h3>{document.title}</h3>
    </nav>
  );
}