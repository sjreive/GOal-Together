import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";

export default function MemberEmailItem(props) {
  
  return (
    <div className={classes.formRow}>
      <Button
          remove={true}
          smallCircle={true}
          onClick={e => props.removeMemberEmail()}
          innerContent="-"
        />
      <input type="email" placeholder="Enter email" name={"email" + props.index} value={props.memberEmail} onChange={props.setMemberEmail}></input>
    </div>
  );
};