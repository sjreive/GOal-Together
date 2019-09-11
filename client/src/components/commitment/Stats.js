import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";

import Donut from "../charts/Donut";
import CommitmentStatus from "../status_pill/CommitmentStatus";
import GeneralPill from "../status_pill/GeneralPill";
import LeaderboardTable from "../charts/LeaderboardTable";
import RankingPill from "../status_pill/RankingPill";

const classNames = require("classnames");

export default function Stats(props) {
  const wrapperContainer = classNames(classes.commitmentStatsContainer, classes.wrapper);


  const chartAttendanceData = props.attendance.map(member => {
    const name = member.name;
    const commitmentScore = member.commitmentScore;
    const memberObject = {};
    memberObject[name] = commitmentScore;
    return memberObject;
  })

  return (
    <div className={wrapperContainer}>
        <GeneralPill header="Description" body={props.commitment.description} />
        {chartAttendanceData.length === 0 && <GeneralPill header="No stats available yet" body="Book an activity and get voting start tracking your stats!" />}
        {chartAttendanceData.length > 0 && <Donut data={chartAttendanceData} userName={props.userName} userCommitmentScore={props.userCommitmentScore} title={props.title}/>}
        {chartAttendanceData.length > 0 && <CommitmentStatus flakiest={props.flakiest} stakes={props.commitment.stakes} />}
        {props.keenest.commitmentScore > props.flakiest.commitmentScore && <RankingPill positive={true} header="Keenest Keener:" name={props.keenest.name} score={props.keenest.commitmentScore} imageId={props.keenest.imageId} />}
        {props.keenest.commitmentScore > props.flakiest.commitmentScore && <RankingPill negative={true} header="Flakiest Flake:" name={props.flakiest.name} score={props.flakiest.commitmentScore} imageId={props.flakiest.imageId} />}
        {chartAttendanceData.length > 0 && <LeaderboardTable attendance={props.attendance}/>}
    </div>
  );
};