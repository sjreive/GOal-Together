import React, { useState, useEffect } from "react";
import classes from "./Nav.module.scss";
import "./Nav.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faPlusCircle,
  faUserAlt,
  faTasks,
  faMedal,
  faCircle
} from "@fortawesome/free-solid-svg-icons";

const classNames = require("classnames");

export default function BottomNav({
  Link,
  notifications,
  invitations,
  activities,
  votes
}) {
  const bottomNavClass = classNames(classes.nav, classes.bottomNav);

  const [numberOfNotifications, setNumberOfNotifications] = useState(0);


  useEffect(() => {
    
    setNumberOfNotifications(
      notifications.filter(activity => activity).length + invitations.length
    );
  }, [notifications, votes]);

  return (
    <nav className={bottomNavClass} notifications={notifications}>
      <span>
        <Link to={`/profile`}>
          <FontAwesomeIcon className={classes.navIcon} icon={faUserAlt} />
        </Link>
        <Link to={`/commitments`}>
          <FontAwesomeIcon className={classes.navIcon} icon={faTasks} />
        </Link>
      </span>
      <Link to={`/commitments/new`} className={classes.newCommitButton}>
        <FontAwesomeIcon
          className={classes.newCommitIcon}
          icon={faPlusCircle}
        />
      </Link>
      <span className={classes.rightSpan}>
        <div>
          <Link to={`/leaderboard`}>
            <FontAwesomeIcon className={classes.navIcon} icon={faMedal} />
          </Link>
        </div>

        <div>
          <Link to={`/notifications`}>
            <FontAwesomeIcon className={classes.navIcon} icon={faBell} />
            {numberOfNotifications > 0 && (
              <div className={classes.notifications}>
                <FontAwesomeIcon
                  className={classes.alertIcon}
                  icon={faCircle}
                />
                <p className={classes.notificationsNumber}>
                  {numberOfNotifications}
                </p>
              </div>
            )}
          </Link>
        </div>
      </span>
    </nav>
  );
}
