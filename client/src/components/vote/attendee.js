import React from "react";
import classes from "../members/MemberListItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

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

      {props.value ? (
        <FontAwesomeIcon
          className={classes.members__icon_true}
          icon={faCheckCircle}
        />
      ) : (
        <FontAwesomeIcon
          className={classes.members__icon_false}
          icon={faTimesCircle}
        />
      )}
    </li>
  );
}
