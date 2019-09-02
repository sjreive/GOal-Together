import React from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import Button from "../button/Button";

const classNames = require('classnames');

export default function NewCommitmentForm(props) {
  return (
    
    <form>
      
      <Button 
        back={true}
        smallCircle={true}
      />
    </form>
  );
};