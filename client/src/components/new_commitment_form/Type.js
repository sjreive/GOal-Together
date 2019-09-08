import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";
import Form from 'react-bootstrap/Form';

export default function Type(props) {
  return (
    <Form.Group controlId="newCommitForm.ControlInput1">
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <Form.Label ><h2>Enter the type of commitment:</h2></Form.Label>
      <Form.Control as="select" name="type" value={props.type} onChange={props.setType}>
        <option>Fitness</option>
        <option>Academic</option>
        <option>Reading</option>
        <option>Social</option>
        <option>Other</option>
      </Form.Control>
      <Button
        next={true}
        smallCircle={true}
        onClick={props.clickNext}
      />
    </Form.Group>
  );
};