import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";

export default function MemberEmailItem(props) {
  
  return (
    <input type="email" placeholder="Enter email" name={"email" + props.index} value={props.memberEmail} onChange={props.setMemberEmail}></input>
  );
};