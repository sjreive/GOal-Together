import React from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";

export default function CollapseDropDownList({ collapsed, user, Link}) {

  return (
    <ul className={classes.collapseDropDownList}>
      { !collapsed && !user.id && <li><Link to={`/login`}>Login</Link></li>}
      { !collapsed && !user.id && <li><Link to={`/register`}>Register</Link></li>}
      { !collapsed && user.id && <li><Link to={`/logout`}>Logout</Link></li>}
    </ul>
  );
}