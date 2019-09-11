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
  });

  return (
    <section className={classes.profileSection}>
      {props.attendance.length > 0 && (
        <div className={classes.wrapper}>
          {props.keenest.commitmentScore > props.flakiest.commitmentScore && <RankingPill positive={true} header="Keenest Keener:" name={props.keenest.name} score={props.keenest.commitmentScore} imageId={props.keenest.imageId} />}
          {props.keenest.commitmentScore > props.flakiest.commitmentScore && <RankingPill negative={true} header="Flakiest Flake:" name={props.flakiest.name} score={props.flakiest.commitmentScore} imageId={props.flakiest.imageId} />}
          <Donut data={chartAttendanceData} userName={props.userName} userCommitmentScore={props.userCommitmentScore} title={props.title}/>
          <LeaderboardTable attendance={props.attendance} />
        </div>
      )}
      {props.attendance.length === 0 && <div className={classes.wrapper}><h2>Create a commitment and do some activities to start seeing your stats!</h2></div>}
    </section>
  );
};