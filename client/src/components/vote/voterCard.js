import React, { useState, useEffect } from "react";

import classes from "./voterCard.module.scss";
import Attendee from "./attendee";
import Button from "../button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function MemberList(props) {
  const [activityVotes, addActivityVotes] = useState({});
  const members = props.members;

  console.log("activity voters:", activityVotes);
  console.log("members:", members);

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

  const formatDate = props.activity.date.split("-");
  const activityDate = new Date(
    formatDate[0],
    formatDate[1] - 1,
    formatDate[2].substring(0, 2)
  );
  const dateString = activityDate
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ");

  // sets attendance value to true initially
  useEffect(() => {
    console.log("Firing Use Effect");
    const newVotes = Object.values(members).reduce((votes, member) => {
      const value =
        typeof activityVotes[member.id] === "boolean"
          ? activityVotes[member.id]
          : true;
      return { ...votes, [member.id]: value };
    }, {});
    addActivityVotes(newVotes);
  }, [members]);

  //Function to handle submission of vote card
  const submitVoteHandler = () => {
    props.submitVote(submitData(activityVotes, props.activity, props.user));
    props.transition("BLANK");
    props.getActivities();
  };

  const memberListItems = members.map(member => {
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
      <FontAwesomeIcon
        onClick={props.clickBack}
        className={classes.voterCard__icon}
        icon={faArrowLeft}
      />
      <h5 className={classes.voterCard__header}>
        Who attended {props.activity.title} on {dateString} ?
      </h5>
      <p className={classes.voterCard__txt}>
        Click on a member to change their attendance.
      </p>
      <ul className={classes.voterCard__list}>{memberListItems}</ul>
      <section className={classes.voterCard__submit}>
        <form onSubmit={event => event.preventDefault()}>
          <Button
            onClick={submitVoteHandler}
            wide={true}
            innerContent={"Submit your vote!"}
          />
        </form>
      </section>
    </section>
  );
}
