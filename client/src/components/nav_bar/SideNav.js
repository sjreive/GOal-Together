import React, { useState, useEffect } from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";
import Media from 'react-media';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle
} from "@fortawesome/free-solid-svg-icons";


export default function SideNav({
  Link,
  notifications,
  invitations,
  activities,
  votes
}) {
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);
  console.log(
    "bottom nav props",
    notifications.filter(activity => activity).length
  );

  useEffect(() => {
    const count = notifications.filter(activity => activity).length + invitations.length;
    setNumberOfNotifications(
      count > 99 ? 99 : count
    );
  }, [notifications, votes]);
  return (
    <nav className={classes.sideNav}>
      <div className={classes.sideNavContainer}>
        <span>
          <img className={classes.logo} src="/images/hands_together.svg" alt="Teamwork by Pham Duy Phuang Hung of the Noun Project"/>
          <h1>{document.title}</h1>
          <ul>
            <Media query="(max-width: 1100px)">
              {matches => 
                matches ? (
                  <li>
                    <Link to={`/profile`}>
                      Profile
                    </Link>
                  </li>
                  ) : (
                    <span className={classes.invisible}></span>
                )}
            </Media>
            <li>
              <Link to={`/commitments`}>
                Commitments
              </Link>
            </li>
            <li>
              <Link to={`/leaderboard`}>
                Leaderboard
              </Link>
            </li>
            <li>
              <Link className={classes.notificationsLink} to={`/notifications`}>
                Notifications
                {numberOfNotifications > 0 && (
                  // <div className={classes.notifications}>
                    <div className={classes.notificationContainer}>
                      <p className={classes.notificationsNumber}>
                        {numberOfNotifications}
                      </p>
                    </div>
                  // </div>notifications.filter(activity => activity).length + invitations.length 
                )}
              </Link>
            </li>
          </ul>
        </span>
        

      </div>
    </nav>
  );
}