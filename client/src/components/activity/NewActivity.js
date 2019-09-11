import React, { useState, useEffect } from "react";
import classes from "../new_commitment_form/Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBackward } from "@fortawesome/free-solid-svg-icons";

import Button from "../button/Button";
import Form from "react-bootstrap/Form";

export default function NewActivity(props) {
  const { mode, transition, back } = useVisualMode("BUTTON");

  //State used to set title & date in new activity form
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDate, setActivityDate] = useState("");

  const setNewActivityInfo = async activity => {
    const newActivity = await props.submitActivity(activity);
    return newActivity;
  };

  const activitySubmissionHandler = activity => {
    if (activity.date && activity.title) {
      transition("BUTTON");
      setNewActivityInfo(activity);
    }
  };

  return (
    <div className={classes.newActivityContainer}>
      {mode === "BUTTON" && (
        <div>
          <Button
            className={classes.addActivityButton}
            wide={true}
            innerContent={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => transition("NEWACTIVITY")}
          />
        </div>
      )}

      {mode === "NEWACTIVITY" && (
        <div className={classes.newActivityForm__outer}>
          <div className={classes.newActivityHeader}>
            <h4>Add an Activity</h4>
          </div>
          <div className={classes.newActivityForm}>
            <Form.Group
              controlId="newActivityForm"
              className={classes.newCommitForm__activity}
            >
              <Form.Label>
                <h6>Name of this Activity:</h6>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Activity Title"
                name="title"
                value={activityTitle}
                onChange={e => setActivityTitle(e.target.value)}
              />
              <Form.Label>
                <h6>Activity Date:</h6>
              </Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={activityDate}
                max="2020-12-31"
                onChange={e => setActivityDate(e.target.value)}
              />
              <div className={classes.newActivityButtons}>
                <Button
                  smallCircle={true}
                  backForm={true}
                  onClick={() => back()}
                />

                <form onSubmit={event => event.preventDefault()}>
                  <Button
                    smallCircle={true}
                    next={true}
                    onClick={() =>
                      activitySubmissionHandler({
                        title: activityTitle,
                        date: activityDate,
                        commitment_id: props.commitment.id
                      })
                    }
                  />
                </form>
              </div>
            </Form.Group>
          </div>
        </div>
      )}

      {mode === "CREATED" && (
        <div>
          <p>
            The activity <b>{activityTitle}</b> on <b>{activityDate}</b> has
            been created for this commitment!
          </p>
          <Button
            className={classes.addActivityButton}
            wide={true}
            innerContent={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => transition("NEWACTIVITY")}
          />
        </div>
      )}
    </div>
  );
}
