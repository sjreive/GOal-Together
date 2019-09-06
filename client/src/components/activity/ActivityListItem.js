import React from "react";

import classes from "./ActivityListItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";

export default function ActivityListItem(props) {
  // Date formatting
  const formatDate = props.date.split("-");
  const activityDate = new Date(
    formatDate[0],
    formatDate[1] - 1,
    formatDate[2].substring(0, 1)
  );
  const dateString = activityDate
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ");
  console.log(dateString);

  const now = Date.now();
  console.log(now);
  return (
    <main className={classes.activityTile}>
      <section className={classes.activityTile__top}>
        {now < activityDate ? (
          <section className={classes.activityTile__txt}>
            <p className={classes.activityTile__category}>
              You have an activity coming up on {dateString}:
            </p>
            <h3 className={classes.activityTile__name}>{props.title}</h3>
          </section>
        ) : (
          <section className={classes.activityTile__txt}>
            <p className={classes.activityTile__category}>
              Click to confirm who attended
            </p>
            <h3 className={classes.activityTile__name}>{props.title}</h3>
          </section>
        )}

        <section className={classes.activityTile__icon}>
          {now < activityDate ? (
            <FontAwesomeIcon
              className={classes.members__icon_cal}
              icon={faCalendarAlt}
            />
          ) : (
            <FontAwesomeIcon
              className={classes.members__icon_exclam}
              icon={faExclamationCircle}
            />
          )}
        </section>
      </section>
      <section className={classes.activityTile__info}>
        <p className={classes.activityTile__category}>{dateString}</p>
      </section>
    </main>
  );
}