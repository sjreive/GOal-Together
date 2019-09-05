import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";

import Donut from "../charts/Donut";
import StatusPill from "../status_pill/StatusPill";


export default function Stats(props) {
  const [type, setType] = useState(props.type || "");

  return (
    <section className={classes.profileSection}>
      <StatusPill />
      <div className={classes.chartContainer}>
        <Donut data={props.attendance} title={props.title}/>
      </div>

    </section>
  );
};