import React, { useState } from "react";
import classes from "../new_commitment_form/Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Button from "../button/Button";
import Form from "react-bootstrap/Form";
import ActivityListItem from "../activity/ActivityListItem";

export default function NewActivity(props) {
  console.log("commitment:", props.commitment.id);
  const { mode, transition, back } = useVisualMode("BUTTON");

  //State used to set title & date in new activity form
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDate, setActivityDate] = useState("");

  const activitySubmissionHandler = activity => {
    console.log("activity data:", activity);
    props.submitActivity(activity);
    transition("SHOW");
  };

  const activity = (activityTitle, activityDate, commitment_id) => {
    return {
      title: activityTitle,
      date: activityDate,
      commitment_id: props.commitment.id
    };
  };

  return (
    <div>
      {mode === "BUTTON" && (
        <Button
          className={classes.addActivityButton}
          wide={true}
          innerContent={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => transition("NEWACTIVITY")}
        />
      )}

      {mode === "NEWACTIVITY" && (
        <Form.Group
          controlId="newActivityForm"
          className={classes.newActivityForm}
        >
          <Form.Label>
            <h7>Name of this Activity:</h7>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Activity Title"
            name="title"
            value={activityTitle}
            onChange={e => setActivityTitle(e.target.value)}
          />
          <Form.Label>
            <h7>Activity Date:</h7>
          </Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={activityDate}
            max="2020-12-31"
            onChange={e => setActivityDate(e.target.value)}
          />

          <Button
            next={false}
            smallCircle={true}
            innerContent={"back"}
            onClick={() => back()}
          />

          <form onSubmit={event => event.preventDefault()}>
            <Button
              smallCircle={true}
              innerContent={"submit"}
              onClick={() =>
                activitySubmissionHandler({
                  title: activityTitle,
                  date: activityDate,
                  commitment_id: props.commitment.id
                })
              }
            />
          </form>
        </Form.Group>
      )}

      {mode === "SHOW" && (
        <ActivityListItem
          members={props.members}
          user={props.user}
          activity={{
            title: activityTitle,
            date: activityDate,
            commitment_id: props.commitment.id
          }}
          key={activity.id}
          date={activityDate}
          submitVote={props.submitVote}
        />
      )}
    </div>
  );
}
