import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { statusImage } from "../../constants/image_ids";
import urls from '../../actions/urls';
const classNames = require('classnames');

export default function UserStatus(props) {
  const userStatus = classNames(classes.statusContainer, classes.statusPill);
  
  return (
    <div className={userStatus}>
      <div className={classes.userNameContainer}>
        <h3>Liz</h3>
        <h4>Status: <strong>Sloth!</strong></h4>
      </div>
      <Image cloudName={urls.CLOUD_NAME} publicId={statusImage.sloth} width="auto" dpr="auto" responsive crop="scale" alt="Freepik sloth from https://www.flaticon.com"/>
    </div>
  );
};