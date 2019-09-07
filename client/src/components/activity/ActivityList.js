import React, { useState, useEffect } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";

import classes from "./ActivityList.module.scss";
import ActivityListItem from "./ActivityListItem";

export default function ActivityList(props) {
  const activities = props.activities;

  console.log(`Activity List Props: ${props.activities["1"].id}`);

  console.log(Object);

  const activityListItems = Object.keys(activities).map((id, Activity) => (
    <ActivityListItem
      members={props.members}
      user={props.user}
      activity={activities[id]}
      key={activities[id].id}
      date={activities[id].date}
      submitVote={props.submitVote}
    />
  ));

  return <ul className={classes.activityList}>{activityListItems}</ul>;
}
