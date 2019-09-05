import React from "react";

import classes from "./CommitmentList.module.scss";
import CommitmentListItem from "./CommitmentListItem";

export default function CommitmentList(props) {
  const commitments = props.commitments;
  const commitmentListItems = Object.keys(commitments).map((id, commitment) => (
    <CommitmentListItem
      key={commitments[id].id}
      name={commitments[id].name}
      thumbnail={commitments[id].thumbnail}
      description={commitments[id].description}
      members={props.members}
    />
  ));

  return <ul className={classes.commitmentList}>{commitmentListItems}</ul>;
}
