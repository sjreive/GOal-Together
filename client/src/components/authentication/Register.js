import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import axios from 'axios';
import reactAppURLS from '../../actions/urls';
import {useVisualMode } from "../../hooks/useVisualMode";
import urls from '../../actions/urls';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

import Button from '../button/Button';
const classNames = require("classnames");

export default function Register(props) {
  const { mode, transition } = useVisualMode("NAME");
  const uploadContainer = classNames(classes.formRow, "upload");

  const [firstName, setFirstName] = useState("");  
  const [lastName, setLastName] = useState("");
  const [avatarURL, setAvatarUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const request = {"auth": {"email": email, "password": password}};
    axios.post(`${reactAppURLS.API_URL}/user_token`, request)
      .then(response => {
        localStorage.setItem("jwt", response.data.jwt);
      })
      .catch(error => console.log('error', error));
  }

  const uploadWidget = window.cloudinary.createUploadWidget({
    cloudName: urls.CLOUD_NAME, 
    cropping: true,
    uploadPreset: urls.PRESET}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        setAvatarUrl(result.info.public_id); 
      }
    }
  )

  return (
    <section className={classes.authenticationFormSection}>
      <h2>Register</h2>
        <form onSubmit={handleSubmit} className={classes.authenticationForm}>
          {mode === "NAME" && (<div className={classes.registrationSection}>
            <div className={classes.formRow}>
              <label htmlFor="first_name">First Name: </label>
              <input name="first_name" id="first_name" type="email" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
            </div>
            <div className={classes.formRow}>
              <label htmlFor="last_name">Last Name:</label>
              <input name="last_name" id="last_name" type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <div className={uploadContainer}>
              <label htmlFor="avatar_url">Avatar:</label>
              <Button
                wide={true}
                innerContent="Choose File"
                onClick={e => {
                  e.preventDefault()
                  uploadWidget.open()}}
              />
            </div>
            <Button
              next={true}
              smallCircle={true}
              onClick={e => transition("EMAIL")}
            />
          </div>)}

          {mode === "EMAIL" && (<div className={classes.registrationSection}>
            <Button 
              back={true}
              smallCircle={true}
              onClick={e => transition("NAME")}
            />
            <div className={classes.formRow}>
              <label htmlFor="email">Email: </label>
              <input name="email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={classes.formRow}>
              <label htmlFor="password">Password:</label>
              <input name="password" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className={classes.formRow}>
              <label htmlFor="password_confirmation">Password Confirmation:</label>
              <input name="password_confirmation" id="password_confirmation" type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
            </div>
            <Button
              form={props.form}
              wide={true}
              onClick={handleSubmit}
              innerContent="Submit"
            />
          </div>)}
        </form>
    </section>
  );
};