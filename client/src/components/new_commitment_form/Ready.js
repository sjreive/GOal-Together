import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";

export default function Ready(props) {
  return (
    <div className={classes.formRow}>
      <h2>Ready to crush your goal?</h2>
      <Button
        next={true}
        smallCircle={true}
        onClick={props.clickNext}
      />
    </div>
  );
};