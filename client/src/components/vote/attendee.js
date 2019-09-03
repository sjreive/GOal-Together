import React from "react";
import classes from "../members/MemberListItem.module.scss";

export default function VoterListItem(props) {
  const handleClick = () => props.clickHandler(props.value, props.id);

  return (
    <li className={classes.members__item}>
      <img
        className={classes.members__item_image}
        src={props.avatar}
        alt={props.name}
        onClick={handleClick}
      />
    </li>
  );
}
