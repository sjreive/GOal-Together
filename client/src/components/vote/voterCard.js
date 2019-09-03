import React, { useState, useEffect } from "react";

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
      voter: user,
      activity_id: activity.id,
      attendees: activityVotes
    };
  };

  // sets attendance value to true initially
  useEffect(() => {
    const newVotes = props.members.reduce((votes, member) => {
      const value =
        typeof activityVotes[member.id] === "boolean"
          ? activityVotes[member.id]
          : true;

      return { ...votes, [member.id]: value };
    }, {});
    addActivityVotes(newVotes);
  }, [props.members]);

  const memberListItems = props.members.map(member => {
    return (
      <Attendee
        value={activityVotes[member.id]}
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
        Who attended {props.activity.title} on {props.activity.date} ?
      </h2>
      <p className={classes.voterCard__txt}>
        Click on a member to change their attendance.
      </p>
      <ul className={classes.voterCard__list}>{memberListItems}</ul>
      <section className={classes.voterCard__submit}>
        <form onSubmit={event => event.preventDefault()}>
          <Button
            onClick={() => {
              console.log(
                submitData(activityVotes, props.activity, props.user)
              );
              props.submitVote(
                submitData(activityVotes, props.activity, props.user)
              );
            }}
            wide={true}
            innerContent={"Submit your vote!"}
          />
        </form>
      </section>
    </section>
  );
}
