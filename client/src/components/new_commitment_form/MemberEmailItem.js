import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";

export default function MemberEmailItem(props) {
  return (
    <div className={classes.formRow}>
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <h2>Put your money where your mouth is!</h2>
      <label htmlFor="name"><p>How much will members put up to help them stick to this goal?</p></label>
      <input type="text" placeholder="Enter amount" name="buy-in" value={props.buyIn} onChange={props.setBuyIn}></input>
      <Button
        next={true}
        smallCircle={true}
        onClick={props.clickNext}
      />
    </div>
  );
};