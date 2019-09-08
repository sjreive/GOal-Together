import React, { useState, useEffect } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";
import VoterCard from "../vote/voterCard";

import classes from "./ActivityListItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";

export default function ActivityListItem(props) {
  const { mode, transition, back } = useVisualMode("FIRST");

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

  //Function to handle transition after voting
  const transitionAfterVote = () =>
    props.title ? transition("VOTED") : transition("BLANK");

  return (
    <div>
      {mode === "FIRST" && (
        <main className={classes.activityTile}>
          <section className={classes.activityTile__top}>
            {now < activityDate ? (
              <section className={classes.activityTile__txt}>
                <p className={classes.activityTile__category}>
                  You have an activity coming up on {dateString}:
                </p>
                <h3 className={classes.activityTile__name}>
                  {props.activity.title}
                </h3>
              </section>
            ) : (
              <section className={classes.activityTile__txt}>
                <p className={classes.activityTile__category}>
                  Click to confirm who attended
                </p>
                <h3 className={classes.activityTile__name}>
                  {props.activity.title}
                </h3>
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
                  onClick={e => transition("VOTE")}
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
      )}

      {mode === "VOTE" && (
        <VoterCard
          members={props.members}
          user={props.user}
          activity={props.activity}
          submitVote={props.submitVote}
          transition={transitionAfterVote}
          clickBack={e => back()}
        />
      )}

      {mode === "VOTED" && (
        <main className={classes.activityTile}>
          <section className={classes.activityTile__top}>
            <section className={classes.activityTile__txt}>
              <h3 className={classes.activityTile__name}>
                {props.activity.title}
              </h3>
            </section>
          </section>
          <section className={classes.activityTile__info}>
            <p className={classes.activityTile__category}>{dateString}</p>
          </section>
        </main>
      )}
    </div>
  );
}
