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

  console.log("ACtiviyListItem", props);

  // Date formatting
  const formatDate = props.activity && props.date.split("-");
  const activityDate = new Date(
    formatDate[0],
    formatDate[1] - 1,
    formatDate[2].substring(0, 2)
  );

  const dateString =
    props.activity &&
    activityDate
      .toString()
      .split(" ")
      .slice(0, 4)
      .join(" ");
  console.log("datestring", dateString);

  const now = Date.now();
  console.log(now);

  // console.log(
  //   "attended? activity",
  //   props.activity.title,
  //   props.activity.attendance[props.user.id]
  // );

  //Function to handle transition after voting
  const transitionAfterVote = () =>
    props.title && props.activity ? transition("VOTED") : transition("BLANK");

  return (
    props.activity && (
      <div>
        {mode === "FIRST" && props.activity && (
          <main className={classes.activityTile}>
            {now < activityDate ? (
              <div className={classes.Tile}>
                <section className={classes.activityTile__top}>
                  <section className={classes.activityTile__txt}>
                    <p className={classes.activityTile__category}>
                      You have an activity coming up:
                    </p>
                    <h3 className={classes.activityTile__name}>
                      {props.activity.title}
                    </h3>
                  </section>
                  <section className={classes.activityTile__icon}>
                    <FontAwesomeIcon
                      className={classes.members__icon_cal}
                      icon={faCalendarAlt}
                    />
                  </section>
                </section>
                <section className={classes.activityTile__info}>
                  <p className={classes.activityTile__category}>{dateString}</p>
                </section>
              </div>
            ) : now > activityDate &&
              props.activity &&
              props.activity.voted &&
              !props.activity.voted[props.user.id] ? (
              <div className={classes.Tile}>
                <section className={classes.activityTile__top}>
                  <section className={classes.activityTile__txt}>
                    <p className={classes.activityTile__category}>
                      Click to confirm who attended
                    </p>
                    <h3 className={classes.activityTile__name}>
                      {props.activity.title}
                    </h3>
                  </section>
                  <section className={classes.activityTile__icon}>
                    <FontAwesomeIcon
                      onClick={e => transition("VOTE")}
                      className={classes.members__icon_exclam}
                      icon={faExclamationCircle}
                    />
                  </section>
                </section>
                <section className={classes.activityTile__info}>
                  <p className={classes.activityTile__category}>{dateString}</p>
                </section>
              </div>
            ) : (
              <div className={classes.Tile__past}>
                <section className={classes.activityTile__top}>
                  <section className={classes.activityTile__txt}>
                    <h3 className={classes.activityTile__name}>
                      {props.activity.title}
                    </h3>
                    <p className={classes.activityTile__name}>
                      This activity has taken place. You
                      {props.activity.attendance[props.user.id]
                        ? " attended."
                        : " did not attend."}
                    </p>
                  </section>
                </section>
                <section className={classes.activityTile__info}>
                  <p className={classes.activityTile__category}>{dateString}</p>
                </section>
              </div>
            )}
          </main>
        )}

        {mode === "VOTE" && props.activity && (
          <VoterCard
            members={props.members}
            user={props.user}
            activity={props.activity}
            submitVote={props.submitVote}
            getNotifications={props.getNotifications}
            transition={transitionAfterVote}
            clickBack={e => back()}
            getActivities={props.getActivities}
          />
        )}

        {mode === "VOTED" && props.activity && (
          <main className={classes.activityTile}>
            <div className={classes.Tile__past}>
              <section className={classes.activityTile__top}>
                <section className={classes.activityTile__txt}>
                  <h3 className={classes.activityTile__name}>
                    {props.activity.title}
                  </h3>
                  <p className={classes.activityTile__name}>
                    This activity has taken place. You
                    {props.activity.attendance[props.user.id]
                      ? " attended."
                      : " did not attend."}
                  </p>
                </section>
              </section>
              <section className={classes.activityTile__info}>
                <p className={classes.activityTile__category}>{dateString}</p>
              </section>
            </div>
          </main>
        )}
      </div>
    )
  );
}
