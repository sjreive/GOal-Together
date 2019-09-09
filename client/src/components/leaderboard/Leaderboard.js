import React, { useState, useEffect } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";

import Donut from "../charts/Donut";
import RankingPill from "../status_pill/RankingPill";
import LeaderboardTable from "../charts/LeaderboardTable";

export default function Leaderboard(props) {

  return (
    <section className={classes.profileSection}>
      <div className={classes.wrapper}>
        <RankingPill header="Keenest Keener:" name="Jane" score={95} imageId="pfhshugcpcfiboh9rhq5" />
        <RankingPill header="Flakiest Flake:" name="Kendall" score={10} imageId="c73xjbgjfszmycs1upz1" />
        <Donut data={props.attendance} title={props.title}/>
        <LeaderboardTable />
      </div>
    </section>
  );
};