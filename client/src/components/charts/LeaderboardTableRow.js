import React, { useState } from "react";
import Media from 'react-media';

export default function LeaderboardTableRow(props) {
  
  return (
    <tr>
      <Media query="(min-width: 300px)">
        {matches => (
          matches && (
            <td>{props.rank}</td>
         ))}
         </Media>
      <td>{props.name}</td>
      <td>{props.commitmentScore}%</td>
    </tr> 
  );
};