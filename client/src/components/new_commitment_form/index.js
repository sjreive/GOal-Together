import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import {useVisualMode } from "../../hooks/useVisualMode";

import Ready from "./Ready";
import Type from"./Type";
import Name from"./Name";
import BuyIn from "./BuyIn";
import EndDate from"./EndDate";
import Members from "./Members";

export default function NewCommitmentForm(props) {
  const { mode, transition, back } = useVisualMode("FIRST");

  const [type, setType] = useState(props.type || "");
  const [name, setName] = useState(props.name || "");
  const [buyIn, setBuyIn] = useState(props.buyIn || "");
  const [endDate, setEndDate] = useState(props.endDate || "");
  const [membersArray, setMembersArray] = useState(props.membersArray || []);
  const [error, setError] = useState("");
  
  if (membersArray.length === 0) {
    for (let i = 0; i <= 0; i++ ) {
      setMembersArray(prev => [...prev, ""])
    }
  }

  const save = () => {
    const commitment = {
      name,
      description: "",
      start_date: Date.now.toString(),
      end_date: endDate,
      buy_in_cents: buyIn,
      activity_type: type,
      thumbnail: ""
    };
    props.setNewCommitment(commitment)
  };

  return (
    <form className={classes.newCommitForm} onSubmit={e => e.preventDefault()}>
      {mode === "FIRST" && <Ready clickNext={e => transition("TYPE")}/>}
      {mode === "TYPE" && <Type clickBack={e => back()} clickNext={e => transition("NAME")} type={type} setType={e => setType(e.target.value)}/>}
      {mode === "NAME" && <Name clickBack={e => back()} clickNext={e => transition("BUYIN")} name={name} setName={e => setName(e.target.value)} />}
      {mode === "BUYIN" && <BuyIn clickBack={e => back()} clickNext={e => transition("DATE")} buyIn={buyIn} setBuyIn={e => setBuyIn(e.target.value)} />}
      {mode === "DATE" && <EndDate clickBack={e => back()} clickNext={e => transition("MEMBERS")}  endDate={endDate} setEndDate={e => setEndDate(e.target.value)} />}
      {mode === "MEMBERS" && <Members clickBack={e => back()} save={e => save()} membersArray={membersArray} setMembersArray={setMembersArray} />}
    </form>
  );
};