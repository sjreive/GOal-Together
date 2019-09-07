import React, { useState, useEffect } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";

import classes from "./ActivityList.module.scss";
import ActivityListItem from "./ActivityListItem";

export default function ActivityList(props) {
  const activities = props.activities;
  const [activity, setActivity] = useState({});
  console.log(activity);

  const activityClickHandler = activity => setActivity(activity);

  const activityListItems = Object.keys(activities).map((id, Activity) => (
    <ActivityListItem
      members={props.members}
      submitVote={props.submitVote}
      user={props.user}
      setActivity={activityClickHandler}
      activity={activity}
      key={activities[id].id}
      title={activities[id].title}
      date={activities[id].date}
    />
  ));

  return <ul className={classes.activityList}>{activityListItems}</ul>;
}
