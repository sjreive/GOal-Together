import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";

import Donut from "../charts/Donut";
import UserStatus from "../profile/UserStatus";


export default function Stats(props) {
  const { mode, transition, back } = useVisualMode("FIRST");

  const [type, setType] = useState(props.type || "");

  return (
    <section className={classes.profileSection}>
      <UserStatus />
      <div className={classes.chartContainer}>
        <Donut data={props.state.attendance} title={props.state.title}/>
      </div>

    </section>
  );
};