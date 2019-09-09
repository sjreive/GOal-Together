import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { Image } from 'cloudinary-react';
import urls from '../../actions/urls';
const classNames = require('classnames');

export default function CommitmentStatus(props) {
  const commitmentStatus = classNames(classes.statusContainer, classes.statusPill);
  
  return (
    <div className={commitmentStatus}>
      <div className={classes.userNameContainer}>
        <h3>Stakes</h3>
        <p>Uh oh! At this rate it looks like <strong>{props.flakiest.name}</strong> {props.flakiest.name !== "it's too close to call!" && props.stakes.toLowerCase() + "."} </p>
      </div>
      <Image cloudName={urls.CLOUD_NAME} publicId={"ahnvnlhde0ebe4oovewq"} alt="Icon from flatIcon.com" width="auto" dpr="auto" responsive crop="scale" />
    </div>
  );
};