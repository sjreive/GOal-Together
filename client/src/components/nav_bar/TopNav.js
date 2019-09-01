import React from "react";
import classes from "./TopNav.module.scss";

export default function TopNav(props) {
  return (
    <nav className={classes.topNav}>
      <h3>{document.title}</h3>
    </nav>
  );
}