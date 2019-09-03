import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";
import MemberEmailItem from "./MemberEmailItem";

const classNames = require('classnames');
export default function BuyIn(props) {
    const membersClass = classNames(
      classes.formRow,
      classes.memberForm
    );

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
    <div className={membersClass}>
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <h2>If you want to go far, go together!</h2>
      <p>Add email addresses of members you'd like to invite:</p>
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
        onClick={props.save}
        innerContent="Submit"
      />
    </div>
  );
};