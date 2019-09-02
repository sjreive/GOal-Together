import React from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import Button from "../button/Button";
import Ready from "./Ready";

const classNames = require('classnames');

export default function NewCommitmentForm(props) {
  return (
    
    <form className={classes.newCommitForm}>
      <Button 
        back={true}
        smallCircle={true}
      />

      <div className="row">
        <Ready/>
      </div>

    </form>
  );
};