import React, { useState, useEffect } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";

import classes from "./ActivityList.module.scss";
import ActivityListItem from "./ActivityListItem";
import InvitationListItem from "./InvitationListItem";

import EmptyPagePill from"../status_pill/EmptyPagePill";

export default function NotificationList(props) {
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    console.log("notification List", notificationList);
    setNotificationList(
      props.notifications &&
        props.notifications
          .filter(notification => notification)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
    );
  }, [props.notifications]);

  const activityListItems =
    notificationList &&
    notificationList.map(activity => (
      <ActivityListItem
        members={props.members}
        commitment={props.commitments[activity.commitment_id]}
        user={props.user}
        activity={activity}
        key={activity.id}
        date={activity.date}
        submitVote={props.submitVote}
        getActivities={props.getActivities}
        title={props.title}
        getNotifications={props.getNotifications}
      />
    ));

  const invitationListItems =
    props.invitations &&
    props.invitations.length > 0 &&
    props.invitations.map((invite, index) => (
      <InvitationListItem
        key={index}
        name={invite.name}
        commitment={invite}
        acceptCommitmentInvitation={props.acceptCommitmentInvitation}
        declineCommitmentInvitation={props.declineCommitmentInvitation}
      />
    ));

    const invitationsArePresent = invitationListItems && invitationListItems.length > 0;  
    const activitiesArePresent = activityListItems && activityListItems.length > 0;

  return (
    <div className={classes.notificationContainer}>
      <ul className={classes.activityList}>
        {invitationsArePresent && invitationListItems}
        {activitiesArePresent && activityListItems}
        {!invitationsArePresent && !activitiesArePresent && <div className={classes.wrapper}><EmptyPagePill header="Looks like you don't have any notifications!" imageId={"iuz0nq8v2fvs5v6wnihc"} /></div>}

      </ul>
    </div>
  );
}
