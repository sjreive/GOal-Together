import React from "react";
import classes from "../members/MemberListItem.module.scss";

export default function VoterListItem(props) {
  return (
    <li className={classes.members__item}>
      <img
        className={classes.members__item_image}
        src={props.avatar}
        alt={props.name}
        // onClick={() => {
        //   attendance ? (attendance = false) : (attendance = true);
        //   console.log(attendance);
        // }}
      />
    </li>
  );
}
