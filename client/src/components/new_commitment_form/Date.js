import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";

export default function Ready(props) {
  return (
    <div className={classes.formRow}>
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <label htmlFor="type"><h2>When will your commitment end?</h2></label>
      <select>
        <option value="fitness">Fitness</option>
        <option value="academic">Academic</option>
        <option value="reading">Reading</option>
        <option value="social">Social</option>
        <option value="other">Other</option>
      </select>
      <Button
        submit={true}
        form={props.form}
        wide={true}
        onClick={props.clickNext}
      />
    </div>
  );
};