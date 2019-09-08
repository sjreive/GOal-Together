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
        <p>Pick some consequences for whoever doesn't follow through. Loser:</p>
      </Form.Label>
      
      <Form.Control as="select" name="stakes" value={props.stakes} onChange={props.setStakes}>
        <option>Buys a round of pints</option>
        <option>Completes the cinnamon challenge</option>
        <option>Sings karaoke in front of everyone</option>
        <option>Buys snacks</option>
        <option>Eats a hot pepper</option>
        <option>Mystery dare</option>
      </Form.Control>
      <Button
        next={true}
        smallCircle={true}
        onClick={props.clickNext}
      />
      
    </Form.Group>
  );
};