import React from "react";

import classes from "./MemberList.module.scss";
import MemberListItem from "./MemberListItem";

export default function MemberList(props) {
  const members = props.members;
  const memberListItems = Object.keys(members).map((id, member) => (
    <MemberListItem
      key={members[id].id}
      name={members[id].name}
      avatar={members[id].avatar_url}
    />
  ));

  return (
    <section className={classes.interviewers}>
      <ul className={classes.interviewers__list}>{memberListItems}</ul>
    </section>
  );
}
