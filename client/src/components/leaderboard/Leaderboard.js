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

  console.log("ATTENDANCE DATA",chartAttendanceData)
  console.log(("ATTENDANCE: ", props.attendance));
  return (
    <section className={classes.profileSection}>
      {props.attendance.length > 0 && (
        <div className={classes.wrapper}>
          {props.keenest.commitmentScore > props.flakiest.commitmentScore && <RankingPill positive={true} header="Keenest Keener:" name={props.keenest.name} score={props.keenest.commitmentScore} imageId="pfhshugcpcfiboh9rhq5" />}
          {props.keenest.commitmentScore > props.flakiest.commitmentScore && <RankingPill negative={true} header="Flakiest Flake:" name={props.flakiest.name} score={props.flakiest.commitmentScore} imageId="c73xjbgjfszmycs1upz1" />}
          <Donut data={chartAttendanceData} userName={props.userName} userCommitmentScore={props.userCommitmentScore} title={props.title}/>
          <LeaderboardTable attendance={props.attendance} />
        </div>
      )}
      {props.attendance.length === 0 && <div className={classes.wrapper}><h2>Create a commitment and do some activities to start seeing your stats!</h2></div>}
    </section>
  );
};