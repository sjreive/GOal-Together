import React, { useState } from "react";
import classes from "../new_commitment_form/Styles.module.scss";
import { useVisualMode } from "../../hooks/useVisualMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Button from "../button/Button";
import Form from "react-bootstrap/Form";

export default function NewActivity(props) {
  console.log("commitment:", props.commitment.id);
  const { mode, transition, back } = useVisualMode("BUTTON");

  //State used to set title & date in new activity form
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDate, setActivityDate] = useState("");

  const activitySubmissionHandler = activity => {
    console.log("activity data:", activity);
    props.submitActivity(activity);
    transition("CREATED");
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
        <Form.Group
          controlId="newActivityForm"
          className={classes.newCommitFor__activity}
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
