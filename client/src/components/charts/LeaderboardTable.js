import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";

export default function LeaderboardTable(props) {
  
  return (
    <table className={classes.userLeaderboard}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Committed Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Celine</td>
          <td>97%</td>
        </tr>
        <tr>
          <td>Val</td>
          <td>85%</td>
        </tr>
        <tr>
          <td>Liz</td>
          <td>30%</td>
        </tr>
        <tr>
          <td>Kendall</td>
          <td>22%</td>
        </tr>
      </tbody>
    </table>
  );
};