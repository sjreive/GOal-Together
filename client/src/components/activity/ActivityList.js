import React, { useState, useEffect } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";

import classes from "./ActivityList.module.scss";
import ActivityListItem from "./ActivityListItem";

export default function ActivityList(props) {
  const inactivities =
    !props.notifications &&
    props.activities
      .filter(activity => activity.voted[props.user.id] === true)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

  const actionActivities =
    !props.notifications &&
    props.activities
      .filter(activity => !inactivities.includes(activity))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

  const sortedActivities = !props.notifications && [
    ...actionActivities,
    ...inactivities
  ];

  // Will display either activities or notifications, depending on page
  const activities = props.notifications
    ? props.notifications
        .filter(notification => notification)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    : sortedActivities;

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

  return <ul className={classes.activityList}>{activityListItems}</ul>;
}
