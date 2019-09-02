import React from "react";

import classes from "./voterCard.module.scss";
import Attendee from "./attendee";

export default function MemberList(props) {
  const memberListItems = props.members.map(member => (
    <Attendee
      selected={member.id === props.value}
      attendance={true}
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
