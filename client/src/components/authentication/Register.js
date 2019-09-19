import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import axios from "axios";
import reactAppURLS from "../../actions/urls";
import { useVisualMode } from "../../hooks/useVisualMode";
import urls from "../../actions/urls";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import Form from "react-bootstrap/Form";

import Button from "../button/Button";
const classNames = require("classnames");

export default function Register(props) {
  const { mode, transition } = useVisualMode("NAME");
  const uploadContainer = classNames(classes.formRow, "upload");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarURL, setAvatarUrl] = useState("");
  const [avatarTitle, setAvatarTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      first_name: firstName,
      last_name: lastName,
      avatar_url: avatarURL,
      email,
      password,
      password_confirmation: passwordConfirmation
    };
    axios
      .post(`/users`, { user })
      .then(user => {
        const request = { auth: { email, password } };
        axios.post(`/user_token`, request).then(response => {
          localStorage.setItem("jwt", response.data.jwt);
          props.setUser(user.data);
        });
      })
      .catch(error => console.log("error", error));
  };

  const uploadWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: urls.CLOUD_NAME,
      cropping: true,
      uploadPreset: urls.PRESET
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        setAvatarTitle("Uploaded!");
        setAvatarUrl(result.info.public_id);
      }
    }
  );

  return (
    <section className={classes.authenticationFormSection}>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit} className={classes.authenticationForm}>
        {mode === "NAME" && (
          <div className={classes.registrationSection}>
            <Form.Group controlId="registrationForm.ControlInput1">
              <Form.Label>First Name: </Form.Label>
              <Form.Control
                name="first_name"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="registrationForm.ControlInput2">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                name="last_name"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Form.Group>
            <div className={classes.avatarFormContainer}>
              <div className={classes.avatarFormLabelContainer}>
                <Form.Label>Avatar: {avatarTitle}</Form.Label>
              </div>
              <Button
                wide={true}
                innerContent="Choose File"
                onClick={e => {
                  e.preventDefault();
                  uploadWidget.open();
                }}
              />
            </div>
            <Button
              next={true}
              smallCircle={true}
              onClick={e => transition("EMAIL")}
            />
          </div>
        )}

        {mode === "EMAIL" && (
          <div className={classes.registrationSection}>
            <Button
              back={true}
              smallCircle={true}
              onClick={e => transition("NAME")}
            />
            <Form.Group controlId="registrationForm.ControlInput4">
              <Form.Label>Email: </Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="registrationForm.ControlInput5">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="registrationForm.ControlInput6">
              <Form.Label>Password Confirmation:</Form.Label>
              <Form.Control
                name="password_confirmation"
                placeholder="Confirm Password"
                type="password"
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
              />
            </Form.Group>
            <Button
              form={props.form}
              wide={true}
              onClick={handleSubmit}
              innerContent="Submit"
            />
          </div>
        )}
      </Form>
    </section>
  );
}
