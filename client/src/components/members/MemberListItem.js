import React from "react";
import { Image } from "cloudinary-react";
import urls from "../../actions/urls";

import classes from "./MemberListItem.module.scss";

export default function MemberListItem(props) {
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
          title={"NAME"}
        />
      </div>

      {/* {props.selected ? props.name : ""} */}
    </li>
  );
}
