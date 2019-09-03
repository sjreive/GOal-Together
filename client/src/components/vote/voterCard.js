import React, { useState } from "react";

import classes from "./voterCard.module.scss";
import Attendee from "./attendee";
import Button from "../button/Button";

export default function MemberList(props) {
  const [activityVotes, addActivityVotes] = useState({});

  // switches attendance from true to false on click
  const changeAttendance = function(value, id) {
    addActivityVotes({ ...activityVotes, [id]: !value });
  };

  const submitData = function(activityVotes, activity, user) {
    return {
      voter_id: user,
      activity_id: activity,
      attendees: activityVotes
    };
  };

  const memberListItems = props.members.map(member => {
    // sets attendance value to true initially
    const value =
      typeof activityVotes[member.id] === "boolean"
        ? activityVotes[member.id]
        : true;
    return (
      <Attendee
        value={value}
        id={member.id}
        clickHandler={changeAttendance}
        key={member.id}
        name={member.name}
        avatar={member.avatar_url}
      />
    );
  });

  return (
    <section className={classes.voterCard}>
      <h2 className={classes.voterCard__header}>
        Who attended {props.activity} on DATE?
      </h2>
      <p className={classes.voterCard__txt}>
        Click to select members who were there
      </p>
      <ul className={classes.voterCard__list}>{memberListItems}</ul>
      <section className={classes.voterCard__submit}>
        <Button
          onClick={() =>
            console.log(submitData(activityVotes, props.activity, props.user))
          }
          wide={true}
          innerContent={"Submit your vote!"}
        />
      </section>
    </section>
  );
}
