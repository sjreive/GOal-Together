import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import axios from "axios";
import reactAppURLS from "../../actions/urls";
import Form from "react-bootstrap/Form";

import Button from "../button/Button";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const request = { auth: { email, password } };
    axios
      .post(`/user_token`, request)
      .then(response => {
        localStorage.setItem("jwt", response.data.jwt);
        let token = "Bearer " + response.data.jwt;
        axios({
          method: "get",
          url: `/find_user`,
          headers: { Authorization: token }
        }).then(user => {
          props.setUser(user.data);
        });
      })
      .catch(error => console.log("error", error));
  };

  return (
    <section className={classes.authenticationFormSection}>
      <h2>Log In</h2>

      <Form onSubmit={handleSubmit} className={classes.authenticationForm}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            name="email"
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className={classes.formRow}>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            name="password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          form={props.form}
          wide={true}
          onClick={handleSubmit}
          innerContent="Submit"
        />
      </Form>
    </section>
  );
}
