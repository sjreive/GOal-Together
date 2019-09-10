import React, { useState, useEffect } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";

import classes from "./ActivityList.module.scss";
import ActivityListItem from "./ActivityListItem";
import InvitationListItem from "./InvitationListItem";

export default function ActivityList(props) {
  // Will display either activities or notifications, depending on page
  const activities = props.notifications
    ? props.notifications
        .filter(notification => notification)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    : props.activites && props.activities.sort((a, b) => new Date(a.date) - new Date(b.date));

  const activityListItems =
    activities &&
    activities.map(activity => (
      <ActivityListItem
        members={props.members}
        user={props.user}
        activity={activity}
        key={activity.id}
        date={activity.date}
        submitVote={props.submitVote}
        title={props.title}
      />
    ));

    const invitationListItems = 
      props.invitations && props.invitations.length > 0 &&
      props.invitations.map(invite => (
        <InvitationListItem 
          name={invite.name}
          description={invite.description}
          thumbnail={invite.thumbnail}
        />
      ));

  return <ul className={classes.activityList}>
    {invitationListItems}
    {activityListItems  
  }</ul>;
}
