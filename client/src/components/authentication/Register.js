import React, { useState, useEffect } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import axios from 'axios';
import reactAppURLS from '../../actions/urls';
import {useVisualMode } from "../../hooks/useVisualMode";

import Button from '../button/Button';


export default function Register(props) {
  const { mode, transition, back } = useVisualMode("FIRST");

  const handleSubmit = e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const request = {"auth": {"email": email, "password": password}};
    axios.post(`${reactAppURLS.API_URL}/user_token`, request)
      .then(response => {
        localStorage.setItem("jwt", response.data.jwt);
      })
      .catch(error => console.log('error', error));
  }

  return (
    <section className={classes.authenticationFormSection}>
      <h2>Register</h2>
        <form onSubmit={handleSubmit} className={classes.authenticationForm}>
       
          <Button 
            back={true}
            smallCircle={true}
            onClick={props.clickBack}
          />
          <div className={classes.registrationSection}>
            <div className={classes.formRow}>
              <label htmlFor="email">Email: </label>
              <input name="email" id="email" type="email" />
            </div>
            <div className={classes.formRow}>
              <label htmlFor="password">Password:</label>
              <input name="password" id="password" type="password" />
            </div>
            <div className={classes.formRow}>
              <label htmlFor="password_confirmation">Password Confirmation:</label>
              <input name="password_confirmation" id="password_confirmation" type="password" />
            </div>
            <Button
              next={true}
              smallCircle={true}
              onClick={props.clickNext}
            />
            

          </div>

          <div className={classes.registrationSection}>
            <div className={classes.formRow}>
              <label htmlFor="email">Email: </label>
              <input name="email" id="email" type="email" />
            </div>
            <div className={classes.formRow}>
              <label htmlFor="password">Password:</label>
              <input name="password" id="password" type="password" />
            </div>
            <div className={classes.formRow}>
              <label htmlFor="password_confirmation">Password Confirmation:</label>
              <input name="password_confirmation" id="password_confirmation" type="password" />
            </div>
            <Button
              form={props.form}
              wide={true}
              onClick={handleSubmit}
              innerContent="Submit"
            />
          </div>
        </form>
    </section>
  );
};