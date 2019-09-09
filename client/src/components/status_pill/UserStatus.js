import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { determineUserAttendanceStatusAndImage } from "../../helpers/helpers";
import urls from '../../actions/urls';
const classNames = require('classnames');

export default function UserStatus(props) {
  const userStatus = classNames(classes.statusContainer, classes.statusPill);
  const statusImageObject = determineUserAttendanceStatusAndImage(props.score, props.activityCount)
  return (
    <div className={userStatus}>
      <div className={classes.userNameContainer}>
        <h3>{props.name}</h3>
        <h4>Score: <strong>{props.score}%</strong></h4>
        <h4>Status: <strong>{statusImageObject.statusName}!</strong></h4>
      </div>
      <Image cloudName={urls.CLOUD_NAME} publicId={statusImageObject.imageId} width="auto" dpr="auto" responsive crop="scale" alt="Freepik sloth from https://www.flaticon.com"/>
    </div>
  );
};