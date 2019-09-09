import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";

import Donut from "../charts/Donut";
import CommitmentStatus from "../status_pill/CommitmentStatus";
import GeneralPill from "../status_pill/GeneralPill";
import LeaderboardTable from "../charts/LeaderboardTable";

export default function Stats(props) {
  console.log("HERE ATT:",props.attendance)
  return (
    <div className={classes.commitmentStatsContainer}>
      <GeneralPill header="Description" body={props.commitment.description} />

        <Donut data={props.attendance} userName={props.userName} userCommitmentScore={props.userCommitmentScore} title={props.title}/>

      <CommitmentStatus/>
      {/* <LeaderboardTable/> */}
    </div>
  );
};