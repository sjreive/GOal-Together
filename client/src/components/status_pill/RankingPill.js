import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { Image } from 'cloudinary-react';
import { determineUserAttendanceStatusAndImage } from "../../helpers/helpers";
import urls from '../../actions/urls';
const classNames = require('classnames');

export default function RankingPill(props) {
  const rankingPill = classNames(classes.statusContainer, classes.statusPill);

  return (
    <div className={rankingPill}>
      <div className={classes.userNameContainer}>
        <h3>{props.header}</h3>
        <h3><strong>{props.name}</strong></h3>
        <h4>Score: <strong>{props.score}%</strong></h4>
      </div>
      <Image cloudName={urls.CLOUD_NAME} publicId={props.imageId} alt="Icon from flatIcon.com" width="auto" dpr="auto" responsive crop="scale" alt="Freepik sloth from https://www.flaticon.com"/>
    </div>
  );
};