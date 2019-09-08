import React, { useState } from "react";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";
import {useVisualMode } from "../../hooks/useVisualMode";
import Form from 'react-bootstrap/Form';
import { convertDateToString} from '../../helpers/helpers';

import Ready from "./Ready";
import Type from"./Type";
import Name from"./Name";
import Description from"./Description";
import Stakes from "./Stakes";
import EndDate from"./EndDate";
import Members from "./Members";

export default function NewCommitmentForm(props) {
  const { mode, transition, back } = useVisualMode("READY");

  const [type, setType] = useState("Fitness");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stakes, setStakes] = useState("Buys a round of pints");
  const [endDate, setEndDate] = useState("");
  const [membersArray, setMembersArray] = useState([]);
  const [error, setError] = useState("");
  
  if (membersArray.length === 0) {
    for (let i = 0; i <= 0; i++ ) {
      setMembersArray(prev => [...prev, ""])
    }
  }

  const save = () => {
    const start_date = convertDateToString(new Date());
    

    const  commitment  = {
      name,
      description,
      start_date,
      end_date: endDate,
      stakes,
      activity_type: type,
      thumbnail: ""
    };
    props.setNewCommitment( { commitment: commitment , member_emails: membersArray.filter(memberEmail => memberEmail !== "") })
  };

  return (
    <section className={classes.newCommitmentSection}>
      <Form className={classes.newCommitForm} onSubmit={e => e.preventDefault()}>
        {mode === "READY" && <Ready clickNext={e => transition("TYPE")}/>}
        {mode === "TYPE" && <Type clickBack={e => back()} clickNext={e => transition("NAME")} type={type} setType={e => setType(e.target.value)}/>}
        {mode === "NAME" && <Name clickBack={e => back()} clickNext={e => transition("DESCRIPTION")} name={name} setName={e => setName(e.target.value)} />}
        {mode === "DESCRIPTION" && <Description clickBack={e => back()} clickNext={e => transition("STAKES")} description={description} setDescription={e => setDescription(e.target.value)} />}
        {mode === "STAKES" && <Stakes clickBack={e => back()} clickNext={e => transition("DATE")} stakes={stakes} setStakes={e => setStakes(e.target.value)} />}
        {mode === "DATE" && <EndDate clickBack={e => back()} clickNext={e => transition("MEMBERS")}  endDate={endDate} setEndDate={e => setEndDate(e.target.value)} />}
        {mode === "MEMBERS" && <Members clickBack={e => back()} save={e => save()} membersArray={membersArray} setMembersArray={setMembersArray} />}
      </Form>
    </section>
  );
};