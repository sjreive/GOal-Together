import React from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";

const classNames = require('classnames');

export default function Tab(props) {
  const tabClass = classNames(
    classes.tab, 
    props.selected ? classes.selectedTab : null
  );

  return (
    <li 
      className={tabClass}
      onClick={props.onClick}
    >
      {props.label}
    </li>
  );
}