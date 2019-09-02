import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";

export default function Type(props) {
  return (
    <div className={classes.formRow}>
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <label htmlFor="type"><h2>Enter the type of commitment:</h2></label>
      <select name="type" value={props.type} onChange={props.setType}>
        <option value="fitness">Fitness</option>
        <option value="academic">Academic</option>
        <option value="reading">Reading</option>
        <option value="social">Social</option>
        <option value="other">Other</option>
      </select>
      <Button
        next={true}
        smallCircle={true}
        onClick={props.clickNext}
      />
    </div>
  );
};