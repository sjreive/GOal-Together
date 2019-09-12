import React from "react";

import classes from "./CommitmentList.module.scss";
import CommitmentListItem from "./CommitmentListItem";

import EmptyPagePill from"../status_pill/EmptyPagePill";

export default function CommitmentList({ Link, match, members, commitments }) {
  const commitmentListItems =
    commitments &&
    Object.keys(commitments).map((id, index) => (
      <Link key={index} to={`${match.url}/${id}`}>
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

  return <ul className={classes.commitmentList}>
    {commitmentListItems && commitmentListItems.length > 0 ? commitmentListItems : <div className={classes.wrapper}><EmptyPagePill header="You've got to join a commitment before you can see any!" imageId={"t8nwn9azvmtosi5bsnzn"} /></div>}
  </ul>;
}
