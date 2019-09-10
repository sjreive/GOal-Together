import React from "react";

import classes from "../commitments/CommitmentListItem.module.scss";
import MemberList from "../members/MemberList";

export default function InvitationListItem(props) {
  return (
    <main className={classes.commitmentTile}>
      <section className={classes.commitmentTile__top}>
        <img
          className={classes.commitmentTile__img}
          src={props.thumbnail}
          alt="commitment_category"
        />
      </section>
      <section className={classes.commitmentTile__info}>
        <section className={classes.commitmentTile__txt}>
          <h2 className={classes.commitmentTile__name}>{props.name}</h2>
          <p className={classes.commitmentTile__category}>
            {props.description}
          </p>
        </section>
        <section>
          {/* <MemberList members={props.members} /> */}
        </section>
      </section>
    </main>
  );
}
