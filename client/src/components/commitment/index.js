import React, { useState, useEffect } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";
import classes from "./Styles.module.scss";
import "./Styles.module.scss";

import PageTabs from "../nav_bar/PageTabs";
import Stats from "./Stats";
import ActivityList from "../activity/ActivityList";

import NewActivityForm from "../activity/NewActivity";

export default function Commitment(props) {
  const { mode, transition } = useVisualMode("ACTIVITIES");

  const tabs = [
    {
      label: "Activities",
      mode: "ACTIVITIES"
    },
    {
      label: "Stats",
      mode: "STATS"
    }
  ];

  return (
    <section className={classes.commitmentSection}>
      <PageTabs mode={mode} tabs={tabs} transition={transition} />
      {mode === "ACTIVITIES" && (
        <div className={classes.commitmentActivitiesContainer}>
          <NewActivityForm
            commitment={props.commitment}
            submitActivity={props.submitActivity}
            getActivities={props.getActivities}
          />
          <ActivityList
            title={props.title}
            activities={props.activities}
            members={props.members}
            submitVote={props.submitVote}
            user={props.user}
            getActivities={props.getActivities}
          />
        </div>
      )}
      {mode === "STATS" && (
        <Stats
          flakiest={props.flakiest}
          keenest={props.keenest}
          attendance={props.attendance}
          title={props.title}
          commitment={props.commitment}
          userName={props.user.first_name}
          userCommitmentScore={props.userCommitmentScore}
        />
      )}
    </section>
  );
}
