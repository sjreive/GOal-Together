import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";
import Form from "react-bootstrap/Form";

export default function EndDate(props) {
  return (
    <Form.Group controlId="newCommitForm.ControlInput4">
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <Form.Label ><h2>When will your commitment end?</h2></Form.Label>
      <Form.Control type="date" name="end-date" value={props.endDate} max="2020-12-31" onChange={props.setEndDate}/>
      <Button
        next={true}
        smallCircle={true}
        onClick={props.clickNext}
      />
    </Form.Group>
  );
};