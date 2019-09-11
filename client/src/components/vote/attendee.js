import React from "react";
import classes from "../members/MemberListItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "cloudinary-react";
import urls from "../../actions/urls";

export default function VoterListItem(props) {
  const handleClick = () => props.clickHandler(props.value, props.id);

  return (
    <li className={classes.members__item}>
      <div className={classes.members__item_image}>
        <Image
          cloudName={urls.CLOUD_NAME}
          publicId={props.avatar}
          width="auto"
          dpr="auto"
          responsive
          crop="scale"
          alt="Avatar Img"
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
        <p className={classes.members__item_name}>{props.name}</p>
      </div>
    </li>
  );
}
