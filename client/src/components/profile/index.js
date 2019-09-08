import React, { useState, useEffect } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";

import Donut from "../charts/Donut";
import UserStatus from "../status_pill/UserStatus";
import Leaderboard from "../charts/Leaderboard";

export default function Profile(props) {

  return (
    <section className={classes.profileSection}>
      <div className={classes.wrapper}>
        <UserStatus />
        <Donut data={props.state.attendance} title={props.state.title}/>
        <Leaderboard />
      </div>
    </section>
  );
};