import React from "react";

import classes from "./MemberList.module.scss";
import InterviewListItem from "./MemberListItem";

export default function MemberList(props) {
  const interviewListItems = props.members.map(member => (
    <InterviewListItem
      // selected={listItem.id === props.value}
      // setInterviewer={() => props.onChange(listItem.id)}
      key={member.id}
      name={member.name}
      avatar={member.avatar_url}
    />
  ));

  return (
    <section className={classes.interviewers}>
      <ul className={classes.interviewers__list}>{interviewListItems}</ul>
    </section>
  );
}
