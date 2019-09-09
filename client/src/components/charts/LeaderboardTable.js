import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";

import LeaderboardTableRow from "./LeaderboardTableRow";

export default function LeaderboardTable(props) {
  const tableRows = props.attendance.map(member => <LeaderboardTableRow name={member.name} commitmentScore={member.commitmentScore}/>)
  return (
    <table className={classes.userLeaderboard}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Committed Score</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
};