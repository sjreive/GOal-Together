import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";

export default function Name(props) {
  return (
    <div className={classes.formRow}>
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <label htmlFor="name"><h2>What do you want to call this commitment?</h2></label>
      <input type="text" placeholder="Enter name" name="name" value={props.name} onChange={props.setName}></input>
      <Button
        next={true}
        smallCircle={true}
        onClick={props.clickNext}
      />
    </div>
  );
};