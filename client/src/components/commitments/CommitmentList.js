import React from "react";

import classes from "./CommitmentList.module.scss";
import CommitmentListItem from "./CommitmentListItem";

export default function CommitmentList({ Link, match, members, commitments }) {
  // const commitment_members = Object.values(members).filter(member => commitment.members.includes(member.id))

  const commitmentListItems =
    commitments &&
    Object.keys(commitments).map((id, commitment) => (
      <Link to={`${match.url}/${id}`}>
        <CommitmentListItem
          key={commitments[id].id}
          category={commitments[id].activity_type}
          name={commitments[id].name}
          thumbnail={commitments[id].thumbnail}
          description={commitments[id].description}
          members={Object.values(members).filter(member =>
            commitments[id].members.includes(member.id)
          )}
        />
      </Link>
    ));

  return <ul className={classes.commitmentList}>{commitmentListItems}</ul>;
}
