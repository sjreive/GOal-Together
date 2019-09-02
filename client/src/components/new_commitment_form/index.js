import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import {useVisualMode } from "../../hooks/useVisualMode";

import Ready from "./Ready";
import Type from"./Type";
import Name from"./Name";
import EndDate from"./EndDate";

export default function NewCommitmentForm(props) {
  const { mode, transition, back } = useVisualMode("FIRST");

  const [type, setType] = useState(props.type || "");
  const [name, setName] = useState(props.name || "");
  const [endDate, setEndDate] = useState(props.endDate || "");
  const [error, setError] = useState("");

  return (
    <form className={classes.newCommitForm} onSubmit={e => e.preventDefault()}>
      {mode === "FIRST" && <Ready clickNext={e => transition("TYPE")}/>}
      {mode === "TYPE" && <Type clickBack={e => back()} clickNext={e => transition("NAME")} type={type} setType={e => setType(e.target.value)}/>}
      {mode === "NAME" && <Name clickBack={e => back()} clickNext={e => transition("DATE")} name={name} setName={e => setName(e.target.value)} />}
      {mode === "DATE" && <EndDate clickBack={e => back()}  endDate={endDate} setEndDate={e => setEndDate(e.target.value)} />}
    </form>
  );
};