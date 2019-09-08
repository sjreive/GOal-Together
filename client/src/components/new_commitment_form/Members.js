import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";
import MemberEmailItem from "./MemberEmailItem";
import Form from "react-bootstrap/Form";

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
    <Form.Group controlId="newCommitForm.ControlInput4">
      <Button 
        back={true}
        smallCircle={true}
        onClick={props.clickBack}
      />
      <Form.Label>
        <h2>If you want to go far, go together!</h2>
        <p>Add email addresses of members you'd like to invite:</p>
      </Form.Label>
      {memberEmailFormItemArray}
      <Button
        add={true}
        smallCircle={true}
        onClick={e => props.setMembersArray(prev => [...prev, ""])}
        innerContent="+"
      />
      <div className={classes.submitContainer}>
        <Button
          form={props.form}
          wide={true}
          submit={true}
          onClick={props.save}
          innerContent="Submit"
        />
      </div>
    </Form.Group>
  );
};