import React from "react";

import classes from "./MemberList.module.scss";
import MemberListItem from "./MemberListItem";

export default function MemberList(props) {
  const memberListItems = props.members.map(member => (
    <MemberListItem
      key={member.id}
      name={member.name}
      avatar={member.avatar_url}
    />
  ));

  return (
    <section className={classes.interviewers}>
      <ul className={classes.interviewers__list}>{memberListItems}</ul>
    </section>
  );
}
