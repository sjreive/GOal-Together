import React, { useState, useEffect } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import axios from 'axios';
import reactAppURLS from '../../actions/urls';
import { Redirect } from 'react-router'

export default function Register(props) {
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
      <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div >
            <label htmlFor="email">Email: </label>
            <input name="email" id="email" type="email" />
          </div>
          <div >
            <label htmlFor="password">Password:</label>
            <input name="password" id="password" type="password" />
          </div>
          <button type="submit" >Submit</button>
        </form>
    </section>
  );
};