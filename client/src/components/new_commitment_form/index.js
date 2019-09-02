import React from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import {useVisualMode } from "../../hooks/useVisualMode";

import Ready from "./Ready";
import Type from"./Type";
import Name from"./Name";
import Date from"./Date";

export default function NewCommitmentForm(props) {
  const { mode, transition, back } = useVisualMode("FIRST");

  return (
    <form className={classes.newCommitForm} form="new-commit-form">
      {mode === "FIRST" && <Ready clickNext={e => transition("TYPE")}/>}
      {mode === "TYPE" && <Type clickBack={e => back()} clickNext={e => transition("NAME")}/>}
      {mode === "NAME" && <Name clickBack={e => back()} clickNext={e => transition("DATE")}/>}
      {mode === "DATE" && <Date clickBack={e => back()}  form="new-commit-form"/>}
    </form>
  );
};