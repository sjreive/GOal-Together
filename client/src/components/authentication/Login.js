import React, { useState, useEffect } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import axios from 'axios';
import reactAppURLS from '../../actions/urls';
import { Redirect } from 'react-router'

import Button from '../button/Button';

export default function Login(props) {
  const handleSubmit = e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const request = {"auth": {"email": email, "password": password}};
    axios.post(`${reactAppURLS.API_URL}/user_token`, request)
      .then(response => {
        localStorage.setItem("jwt", response.data.jwt);
        let token = "Bearer " + response.data.jwt;
        axios({method: 'get', url: `${reactAppURLS.API_URL}/find_user`, headers: { 'Authorization': token}})
        .then(user => {
          props.setUser(user.data);
        })
      })
      .catch(error => console.log('error', error));
  }

  return (
    <section className={classes.authenticationFormSection}>
      <h2>Log In</h2>
        <form onSubmit={handleSubmit} className={classes.authenticationForm}>
          <div className={classes.formRow} >
            <label htmlFor="email">Email: </label>
            <input name="email" id="email" type="email" />
          </div>
          <div className={classes.formRow} >
            <label htmlFor="password">Password:</label>
            <input name="password" id="password" type="password" />
          </div>
          <Button
            form={props.form}
            wide={true}
            onClick={handleSubmit}
            innerContent="Submit"
          />
        </form>
    </section>
  );
};