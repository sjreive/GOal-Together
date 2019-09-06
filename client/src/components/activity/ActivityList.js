import React from "react";

import classes from "./ActivityList.module.scss";
import ActivityListItem from "./ActivityListItem";

export default function ActivityList(props) {
  const activities = props.activities;
  console.log(Object.keys(activities));
  console.log(Object.values(activities));
  const activityListItems = Object.keys(activities).map((id, activity) => (
    <ActivityListItem
      key={activities[id].id}
      title={activities[id].title}
      date={activities[id].date}
    />
  ));

  return <ul className={classes.activityList}>{activityListItems}</ul>;
}
