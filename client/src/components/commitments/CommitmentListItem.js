import React from "react";
import { Image } from "cloudinary-react";
import urls from "../../actions/urls";

import { determineCommitmentImage } from "../../helpers/helpers";

import classes from "./CommitmentListItem.module.scss";
import MemberList from "../members/MemberList";

export default function CommimentListItem(props) {
  console.log("img:", determineCommitmentImage(props.category));
  return (
    <main className={classes.commitmentTile}>
      <section className={classes.commitmentTile__top}>
        <div className={classes.commitmentTile__img}>
          <Image
            cloudName={urls.CLOUD_NAME}
            publicId={determineCommitmentImage(props.category)}
            width="auto"
            dpr="auto"
            responsive
            crop="scale"
            alt="Commitment Image"
          />
        </div>
      </section>
      <section className={classes.commitmentTile__info}>
        <section className={classes.commitmentTile__txt}>
          <h2 className={classes.commitmentTile__name}>{props.name}</h2>
          <p className={classes.commitmentTile__category}>
            {props.description}
          </p>
        </section>
        <section>
          <MemberList members={props.members} />
        </section>
      </section>
    </main>
  );
}
