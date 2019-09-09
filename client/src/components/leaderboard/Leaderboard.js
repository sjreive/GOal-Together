import React, { useState, useEffect } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";

import Donut from "../charts/Donut";
import RankingPill from "../status_pill/RankingPill";
import LeaderboardTable from "../charts/LeaderboardTable";

export default function Leaderboard(props) {
  const chartAttendanceData = props.attendance.map(member => {
    const name = member.name;
    const commitmentScore = member.commitmentScore;
    const memberObject = {};
    memberObject[name] = commitmentScore;
    return memberObject;
  })

  const keenest = props.attendance[props.attendance.length - 1];
  const flakiest = props.attendance[0];

  return (
    <section className={classes.profileSection}>
      <div className={classes.wrapper}>
        {keenest.commitmentScore > flakiest.commitmentScore && <RankingPill positive={true} header="Keenest Keener:" name={keenest.name} score={keenest.commitmentScore} imageId="pfhshugcpcfiboh9rhq5" />}
        {keenest.commitmentScore > flakiest.commitmentScore && <RankingPill negative={true} header="Flakiest Flake:" name={flakiest.name} score={flakiest.commitmentScore} imageId="c73xjbgjfszmycs1upz1" />}
        <Donut data={chartAttendanceData} title={props.title}/>
        <LeaderboardTable />
      </div>
    </section>
  );
};