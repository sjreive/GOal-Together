import React from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";

import Tab from "./Tab";

export default function PageTabs(props) {

  const tabs = props.tabs.map(t => {
    return <Tab selected={props.mode === t.mode} label={t.label} onClick={e => props.transition(t.mode)}/>
  });

  return (
    <nav className={classes.tabs}>
      <ul>
        {tabs}
      </ul>
    </nav>
  );
}