import React, { useState, useEffect } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";

import classes from "./ActivityList.module.scss";
import ActivityListItem from "./ActivityListItem";
import InvitationListItem from "./InvitationListItem";

export default function ActivityList(props) {
  const [activityList, setActivityList] = useState([]);
  console.log(props.activities);

  useEffect(() => {
    console.log("Firing Use Effect");
    const inactivities =
      props.activities &&
      props.activities
        .filter(
          activity => activity.voted && activity.voted[props.user.id] === true
        )
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const actionActivities =
      props.activities &&
      props.activities
        .filter(activity => !inactivities.includes(activity))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const sortedActivities = props.activities && [
      ...actionActivities,
      ...inactivities
    ];

    setActivityList(sortedActivities);
    console.log("activity List:", activityList);
  }, [props.activities]);

  const activityListItems =
    activityList &&
    activityList.map(activity => (
      <ActivityListItem
        members={props.members}
        commitment={props.commitment}
        user={props.user}
        activity={activity}
        key={activity.id}
        date={activity.date}
        submitVote={props.submitVote}
        getActivities={props.getActivities}
        title={props.title}
      />
    ));

  const invitationListItems =
    props.invitations &&
    props.invitations.length > 0 &&
    props.invitations.map(invite => (
      <InvitationListItem
        name={invite.name}
        commitment={invite}
        acceptCommitmentInvitation={props.acceptCommitmentInvitation}
        declineCommitmentInvitation={props.declineCommitmentInvitation}
      />
    ));

  return (
    <ul className={classes.activityList}>
      {invitationListItems}
      {activityListItems}
    </ul>
  );
}
