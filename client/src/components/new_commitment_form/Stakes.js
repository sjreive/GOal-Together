import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";
import Form from "react-bootstrap/Form";

export default function Stakes(props) {
  return (
    <Form.Group controlId="newCommitForm.ControlInput3">
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      
      <Form.Label>
        <h2>Let's set some stakes!</h2>
        <p>Pick some consequences for whoever doesn't follow through.</p>
        <p><strong>Loser of this commitment...</strong></p>
      </Form.Label>
      
      <Form.Control as="select" name="stakes" value={props.stakes} onChange={props.setStakes}>
        <option>Has to buy a round of pints</option>
        <option>Must complete the cinnamon challenge</option>
        <option>Has to sing karaoke in front of everyone</option>
        <option>Has to buys snacks</option>
        <option>Must eat a hot pepper</option>
        <option>Must do a mystery dare</option>
      </Form.Control>
      <Button
        next={true}
        smallCircle={true}
        onClick={props.clickNext}
      />
      
    </Form.Group>
  );
};