import React, { useState } from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";
import MemberEmailItem from "./MemberEmailItem";

export default function BuyIn(props) {

  const memberEmailFormItemArray = props.membersArray.map((m, index) => {
    const [memberEmail, setMemberEmail] = useState(m);
    return (
      <MemberEmailItem
        key={index}
        memberemail={memberEmail}
        setMemberEmail={e => setMemberEmail(e.target.value)}
      />
    )
  });

  return (
    <div className={classes.formRow}>
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <h2>Put your money where your mouth is!</h2>
      {memberEmailFormItemArray}
      <Button
        form={props.form}
        wide={true}
        onClick={props.clickNext}
        innerContent="Submit"
      />
    </div>
  );
};