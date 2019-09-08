import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import axios from 'axios';
import reactAppURLS from '../../actions/urls';

import Button from '../button/Button';

export default function Login(props) {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const request = { "auth": { email, password }};
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
            <input name="email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={classes.formRow} >
            <label htmlFor="password">Password:</label>
            <input name="password" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
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