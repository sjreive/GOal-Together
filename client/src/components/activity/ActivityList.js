import React, { useState, useEffect } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";

import classes from "./ActivityList.module.scss";
import ActivityListItem from "./ActivityListItem";

export default function ActivityList(props) {
  const notifications = props.notifications;

  console.log(`Activity List Props: ${notifications}`);

  console.log(Object);

  const activityListItems = notifications.map(activity => (
    <ActivityListItem
      members={props.members}
      user={props.user}
      activity={activity}
      key={activity.id}
      date={activity.date}
      submitVote={props.submitVote}
    />
  ));

  return <ul className={classes.activityList}>{activityListItems}</ul>;
}
