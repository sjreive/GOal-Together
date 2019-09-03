import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";
import MemberEmailItem from "./MemberEmailItem";

export default function BuyIn(props) {

  const memberEmailFormItemArray = props.membersArray.map((memberEmail, index) => {
    return (
      <MemberEmailItem
        key={index}
        index={index}
        memberEmail={memberEmail}
        removeMemberEmail={e => removeMemberEmailFormItem(index)}
        setMemberEmail={e => updateMemberEmailFormItem(e.target.value, index)}
      />
    )
  });

  const updateMemberEmailFormItem = (email, index) => {
    props.setMembersArray(props.membersArray.map((m, i) => {
      if (i !== index) {
        return m;
      }

      
      return email;
    }))
  };

  const removeMemberEmailFormItem = (index) => {
    props.setMembersArray(props.membersArray.filter((m, i) => i !== index))
  };

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
        add={true}
        smallCircle={true}
        onClick={e => props.setMembersArray(prev => [...prev, ""])}
        innerContent="+"
      />
      <Button
        form={props.form}
        wide={true}
        onClick={e => console.log(props.membersArray)}
        innerContent="Submit"
      />
    </div>
  );
};