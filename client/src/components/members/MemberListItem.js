import React from "react";

import classes from "./MemberListItem.module.scss";

export default function MemberListItem(props) {
  return (
    <li className={classes.members__item}>
      <img
        className={classes.members__item_image}
        src={props.avatar}
        alt={props.name}
      />
      {/* {props.selected ? props.name : ""} */}
    </li>
  );
}
