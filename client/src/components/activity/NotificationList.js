import React, { useState, useEffect } from "react";
import { useVisualMode } from "../../hooks/useVisualMode";

import classes from "./ActivityList.module.scss";
import ActivityListItem from "./ActivityListItem";
import InvitationListItem from "./InvitationListItem";

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
    props.invitations.map(invite => (
      <InvitationListItem
        name={invite.name}
        commitment={invite}
        acceptCommitmentInvitation={props.acceptCommitmentInvitation}
        declineCommitmentInvitation={props.declineCommitmentInvitation}
      />
    ));

  return (
    <ul className={classes.activityList}>
      {invitationListItems}
      {activityListItems}
    </ul>
  );
}
