import React from "react";

import "./CommitmentListItem.module.scss";
import MemberList from "../members/MemberList";

export default function CommimentListItem(props) {
  return (
    <main>
      <section>
        <img src={props.thumbnail} alt="commitment_category" />
      </section>
      <section>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
      </section>
      <section>
        <h4>Members</h4>
        <MemberList members={props.members} />
      </section>
    </main>
  );
}
