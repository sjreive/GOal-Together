import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import Media from 'react-media';

import LeaderboardTableRow from "./LeaderboardTableRow";

export default function LeaderboardTable(props) {
  const tableRows = props.attendance.map((member, index) => <LeaderboardTableRow key={index + 1} rank={index + 1} name={member.name} commitmentScore={member.commitmentScore}/>)
  return (
    <table className={classes.userLeaderboard}>
      <thead>
        <tr>
        <Media query="(min-width: 400px)">
        {matches => (
          matches && (
            <th>Rank</th> 
         ))}
         </Media>
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