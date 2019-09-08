import React, { useState, useEffect } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";

import classes from "./ActivityList.module.scss";
import ActivityListItem from "./ActivityListItem";

export default function ActivityList(props) {
  const activities = props.notifications
    ? props.notifications
    : props.activities;

  console.log("activities", activities);

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
