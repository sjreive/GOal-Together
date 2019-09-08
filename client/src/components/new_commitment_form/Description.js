import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";
import Form from "react-bootstrap/Form";

export default function Description(props) {
  return (
    <Form.Group controlId="newCommitForm.ControlTextArea2">
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <Form.Label><h2>Let's give this commitment a description.</h2></Form.Label>
      <Form.Control as="textarea" rows="2" placeholder="Give a quick description" name="description" value={props.description} onChange={props.setDescription}></Form.Control>
      <Button
        next={true}
        smallCircle={true}
        onClick={props.clickNext}
      />
    </Form.Group>
  );
};