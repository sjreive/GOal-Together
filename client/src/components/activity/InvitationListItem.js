import React from "react";
import { Image } from 'cloudinary-react';
import urls from '../../actions/urls';

import classes from "./InvitationListItem.module.scss";

export default function InvitationListItem(props) {
  return (
    <article className={classes.commitmentTile}>
      <div className={classes.commitmentTile__top}>
        <img
          className={classes.commitmentTile__img}
          src={props.thumbnail}
          alt="commitment_category"
        />
        <div className={classes.commitmentTile__txt}>
          
          <h2 className={classes.commitmentTile__name}>You've been invited to a commitment!</h2>
        </div>
      </div>
      <div className={classes.commitmentTile__info}>
        <div className={classes.commitmentTile__txt}>
          <h2 className={classes.commitmentTile__name}>{props.name}</h2>
          <p className={classes.commitmentTile__category}>
            {props.description}
          </p>
        </div>
        <div>
          {/* <MemberList members={props.members} /> */}
        </div>
      </div>
    </article>
  );
}
