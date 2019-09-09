import React, { useState, useEffect } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

import UserStatus from "../status_pill/UserStatus";
import GeneralPill from "../status_pill/GeneralPill";
import urls from '../../actions/urls';

export default function Profile(props) {

  return (
    <section className={classes.profileSection}>
      <div className={classes.wrapper}>
        <div className={classes.avatarContainer}>
          <h2>{props.user.first_name} {props.user.last_name}</h2>
          <Image cloudName={urls.CLOUD_NAME} publicId={props.user.avatar_url} width="auto" dpr="auto" responsive crop="scale" alt="Freepik sloth from https://www.flaticon.com"/>
        </div>
        <UserStatus name={props.user.first_name} score={15}/>
        <GeneralPill header="Description" body="hi" />
      </div>
    </section>
  );
};