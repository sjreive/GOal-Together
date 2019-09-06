import React from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";

const classNames = require('classnames');

export default function CollapseDropDownList(props) {
  const collapseDropDownList = classNames(
    classes.collapseDropDownList,
    !props.collapsed ? classes.collapseDropDownListVisible : null
  );

  return (
    <ul className={collapseDropDownList}>
      { !props.collapsed && <li>Login</li>}
      { !props.collapsed && <li>Register</li>}
      { !props.collapsed && <li>Logout</li>}
    </ul>
  );
}