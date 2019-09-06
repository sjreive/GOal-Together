import React from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";

const classNames = require('classnames');

export default function CollapseDropDownList({ collapsed, user, Link}) {
  const collapseDropDownList = classNames(
    classes.collapseDropDownList,
    !collapsed ? classes.collapseDropDownListVisible : null
  );

  return (
    <ul className={collapseDropDownList}>
      { !collapsed && !user.id && <li><Link to={`/login`}>Login</Link></li>}
      { !collapsed && !user.id && <li><Link to={`/register`}>Register</Link></li>}
      { !collapsed && user.id && <li><Link to={`/logout`}>Logout</Link></li>}
    </ul>
  );
}