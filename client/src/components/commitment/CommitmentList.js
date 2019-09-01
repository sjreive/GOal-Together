import React from "react";

import "./CommitmentList.module.scss";
import CommitmentListItem from "./CommitmentListItem";

export default function CommitmentList(props) {
  const commitmentListItems = props.commitments.map(commitment => (
    <CommitmentListItem
      key={commitment.id}
      name={commitment.name}
      thumbnail={commitment.thumbnail}
      description={commitment.description}
      members={props.members}
    />
  ));

  return <ul>{commitmentListItems}</ul>;
}
