import React, { useState, useEffect } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";

import Donut from "../charts/Donut";
import StatusPill from "../status_pill/StatusPill";
import Leaderboard from "./Leaderboard";

export default function Profile(props) {

  return (
    <section className={classes.profileSection}>
      <StatusPill />
      <div className={classes.chartContainer}>
        <Donut data={props.state.attendance} title={props.state.title}/>
      </div>
      <Leaderboard />
    </section>
  );
};