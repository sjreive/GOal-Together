import React, { useState, useEffect } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";

import classes from "./ActivityList.module.scss";
import ActivityListItem from "./ActivityListItem";
import InvitationListItem from "./InvitationListItem";

export default function ActivityList(props) {
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    console.log("HAPPENING NOW::::", activityList);
    const inactivities =
      !props.notifications &&
      props.activities &&
      props.activities
        .filter(
          activity => activity.voted && activity.voted[props.user.id] === true
        )
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const actionActivities =
      !props.notifications &&
      props.activities &&
      props.activities
        .filter(activity => !inactivities.includes(activity))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const sortedActivities = !props.notifications &&
      props.activities && [...actionActivities, ...inactivities];
      // Will display either activities or notifications, depending on page
      setActivityList(
        props.notifications
        ? props.notifications
        .filter(notification => notification)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        : sortedActivities
        );
  }, [props.activites, props.notifications]);



  const activityListItems =
    activityList &&
    activityList.map(activity => (
      <ActivityListItem
        members={props.members}
        user={props.user}
        activity={activity}
        key={activity.id}
        date={activity.date}
        submitVote={props.submitVote}
        getActivities={props.getActivities}
        title={props.title}
        getNotifications={props.getNotifications}
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
