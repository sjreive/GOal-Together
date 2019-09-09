import React from "react";

import classes from "./CommitmentList.module.scss";
import CommitmentListItem from "./CommitmentListItem";

export default function CommitmentList({ Link, match, members, commitments }) {
  console.log("commitments props:", commitments);

  const commitmentListItems =
    commitments &&
    Object.keys(commitments).map((id, commitment) => (
      <Link to={`${match.url}/${id}`}>
        <CommitmentListItem
          key={commitments[id].id}
          name={commitments[id].name}
          thumbnail={commitments[id].thumbnail}
          description={commitments[id].description}
          members={members}
        />
      </Link>
    ));

  return <ul className={classes.commitmentList}>{commitmentListItems}</ul>;
}
