import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";
import Form from "react-bootstrap/Form";

export default function Name(props) {
  return (
    <Form.Group controlId="newCommitForm.ControlInput2">
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <Form.Label><h2>What do you want to call this commitment?</h2></Form.Label>
      <Form.Control type="text" placeholder="Enter name" name="name" value={props.name} onChange={props.setName}></Form.Control>
      <Button
        next={true}
        smallCircle={true}
        onClick={props.clickNext}
      />
    </Form.Group>
  );
};