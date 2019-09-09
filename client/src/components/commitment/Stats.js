import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";

import Donut from "../charts/Donut";
import CommitmentStatus from "../status_pill/CommitmentStatus";
import GeneralPill from "../status_pill/GeneralPill";
import LeaderboardTable from "../charts/LeaderboardTable";

export default function Stats(props) {
  const [type, setType] = useState(props.type || "");

  return (
    <div className={classes.commitmentStatsContainer}>
      <GeneralPill header="Description" body={props.commitment.description} />
      <div className={classes.chartContainer}>
        <Donut data={props.attendance} title={props.title}/>
      </div>
      <CommitmentStatus/>
      {/* <LeaderboardTable/> */}
    </div>
  );
};