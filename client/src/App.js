import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import "./App.module.scss";
import classes from "./App.module.scss";
import { findUserCommitmentScore } from "./helpers/helpers";
import Media from "react-media";

import ActivityList from "./components/activity/ActivityList";
import NotificationList from "./components/activity/NotificationList";
import CommitmentList from "./components/commitments/CommitmentList";
import VoterCard from "./components/vote/voterCard";
import TopNav from "./components/nav_bar/TopNav";
import BottomNav from "./components/nav_bar/BottomNav";
import NewCommitmentForm from "./components/new_commitment_form/index";
import Profile from "./components/profile/index";
import Commitment from "./components/commitment/index";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import Register from "./components/authentication/Register";
import Leaderboard from "./components/leaderboard/Leaderboard";
import SideNav from "./components/nav_bar/SideNav";

function App() {
  const {
    state,
    setTitle,
    setNewCommitment,
    getNotifications,
    getActivities,
    getCommitment,
    submitActivity,
    setUser,
    submitVote,
    getInvitations,
    acceptCommitmentInvitation,
    declineCommitmentInvitation
  } = useApplicationData();
  console.log(state);
  useEffect(() => {
    document.title = state.title;
  }, [state.title]);

  useEffect(() => {
    getActivities();
  }, []);

  useEffect(() => {
    getNotifications();
    getInvitations();
  }, [state.activities, state.commitments, state.votes]);

  console.log("APP STATE:", state);

  return (
    <Router>
      {/* If on desktop, render profile page as side component, otherwise, use mobile view */}
      <Media query="(max-width: 1250px)">
        {matches =>
          matches ? (
            <Route
              exact
              path="/profile"
              render={props =>
                state.user && state.user.id ? (
                  <ProfilePage
                    {...props}
                    setTitle={setTitle}
                    user={state.user}
                    numberOfCommitments={Object.keys(state.commitments).length}
                    numberOfActivities={Object.keys(state.activities).length}
                    members={state.members}
                    loading={state.loading}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          ) : state.user.id ? (
            <section className={classes.dashboardProfile}>
              <Profile
                user={state.user}
                numberOfActivities={Object.keys(state.activities).length}
                numberOfCommitments={Object.keys(state.commitments).length}
                userCommitmentScore={findUserCommitmentScore(
                  state.user.email,
                  state.members
                )}
              />
            </section>
          ) : (
            <section className={classes.dashboardNotLoggedIn}>
              <h1>GOal Together</h1>
              <img
                className={classes.logo}
                src="/images/hands_together.svg"
                alt="Teamwork by Pham Duy Phuang Hung of the Noun Project"
              />
            </section>
          )
        }
      </Media>
      <Media query="(max-width: 1250px)">
        {matches =>
          !matches && (
            <Route
              exact
              path="/profile"
              render={() => <Redirect to="/leaderboard" />}
            />
          )
        }
      </Media>
      {/* Add side nav bar for desktop instead of top and bottom navs */}
      <Media query="(max-width: 900px)">
        {matches =>
          matches ? (
            <div>
              <TopNav Link={Link} user={state.user} />
              <BottomNav
                notifications={state.notifications}
                activities={state.activities}
                votes={state.votes}
                invitations={state.invitations}
                Link={Link}
                getActivities={getActivities}
                getNotifications={getNotifications}
              />
            </div>
          ) : (
            <SideNav
              notifications={state.notifications}
              activities={state.activities}
              votes={state.votes}
              user={state.user}
              invitations={state.invitations}
              Link={Link}
              getActivities={getActivities}
              getNotifications={getNotifications}
            />
          )
        }
      </Media>

      <Route
        exact
        path="/"
        render={() =>
          state.user.id ? <Redirect to="/profile" /> : <Redirect to="/login" />
        }
      />
      <Route
        exact
        path="/login"
        render={props =>
          state.user && state.user.id ? (
            <Redirect to="/profile" />
          ) : (
            <LoginPage
              {...props}
              setUser={setUser}
              getNotifications={getNotifications}
              setTitle={setTitle}
            />
          )
        }
      />
      <Route
        exact
        path="/logout"
        render={props => <LogoutPage {...props} setUser={setUser} />}
      />
      <Route
        exact
        path="/register"
        render={props =>
          state.user && state.user.id ? (
            <Redirect to="/profile" />
          ) : (
            <RegisterPage
              {...props}
              setUser={setUser}
              getNotifications={getNotifications}
              setTitle={setTitle}
            />
          )
        }
      />
      <Route
        exact
        path="/commitments"
        render={props =>
          state.user && state.user.id ? (
            <Commitments
              {...props}
              state={state}
              setTitle={setTitle}
              Link={Link}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Switch>
        <Route
          exact
          path="/commitments/new"
          render={props =>
            state.user && state.user.id ? (
              <NewCommitment
                {...props}
                setTitle={setTitle}
                setNewCommitment={setNewCommitment}
                getNotifications={getNotifications}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path={`/commitments/:commitmentId`}
          render={props =>
            state.user && state.user.id ? (
              <CommitmentPage
                {...props}
                title={state.title}
                commitments={state.commitments}
                setTitle={setTitle}
                activities={state.activities}
                getNotifications={getNotifications}
                members={state.members}
                submitVote={submitVote}
                user={state.user}
                getActivities={getActivities}
                submitActivity={submitActivity}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
      <Route
        exact
        path="/notifications"
        render={props =>
          state.user && state.user.id ? (
            <Notifications
              {...props}
              commitments={state.commitments}
              getActivities={getActivities}
              getNotifications={getNotifications}
              activities={state.activities}
              setTitle={setTitle}
              submitVote={submitVote}
              members={state.members}
              user={state.user}
              notifications={state.notifications}
              invitations={state.invitations}
              acceptCommitmentInvitation={acceptCommitmentInvitation}
              declineCommitmentInvitation={declineCommitmentInvitation}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />

      <Route
        exact
        path="/leaderboard"
        render={props =>
          state.user && state.user.id ? (
            <LeaderBoardPage
              {...props}
              members={state.members}
              setTitle={setTitle}
              user={state.user}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />

      <Route
        exact
        path="/vote"
        render={props =>
          state.user && state.user.id ? (
            <Vote
              {...props}
              state={state}
              setTitle={setTitle}
              submitVote={submitVote}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </Router>
  );
}

function LoginPage({ match, setUser, setTitle }) {
  if (document.title !== "Login") {
    setTitle("Login");
  }
  return <Login setUser={setUser} />;
}

function LogoutPage({ match, setUser }) {
  return <Logout setUser={setUser} />;
}

function RegisterPage({ setUser, setTitle }) {
  if (document.title !== "Register") {
    setTitle("Register");
  }
  return <Register setUser={setUser} />;
}

function Vote({ state, submitVote }) {
  return (
    <div>
      {/* will also need to pass info about activity id */}
      <VoterCard
        members={state.members}
        user={state.user}
        activity={state.activity}
        submitVote={submitVote}
      />
    </div>
  );
}

function CommitmentPage({
  match,
  commitments,
  title,
  setTitle,
  activities,
  submitVote,
  submitActivity,
  members,
  user,
  getNotifications,
  getActivities
}) {

  let attendance = [];

  const commitment = commitments[parseInt(match.params.commitmentId, 10)];
  // Filter for active members who have joined a commitment
  const activeMembers = Object.values(members).filter(
    member => member.avatar_url
  );

  const commitment_activities =
    Object.keys(activities).length > 0
      ? Object.values(activities).filter(
          activity => activity.commitment_id === commitment.id
        )
      : [];

  if (commitment && document.title !== commitment.name) {
    setTitle(commitment.name);
  }

  commitment.members && commitment.members.map(id => {
    return activeMembers.find(member => member.id === id);
  })
  .filter(member => member)
  .forEach(realMember => {
    const name = realMember.first_name
    const commitmentScore = commitment.attendance[realMember.id]
      ? commitment.attendance[realMember.id]
      : 100;
    const imageId = realMember.avatar_url;
    attendance.push({ name, commitmentScore, imageId });

  });

  attendance = attendance.sort((a, b) => b.commitmentScore - a.commitmentScore);
  let keenest = {
    name: "it's too close to call!",
    commitmentScore: 100,
    imageId: "qb3bao7kv87dznw2jnl8"
  };
  let flakiest = {
    name: "it's too close to call!",
    commitmentScore: 100,
    imageId: "qb3bao7kv87dznw2jnl8"
  };
  if (attendance.length > 1) {
    keenest =
      attendance[0].commitmentScore === attendance[1].commitmentScore
        ? {
            name: "it's too close to call!",
            commitmentScore: attendance[0].commitmentScore,
            imageId: "qb3bao7kv87dznw2jnl8"
          }
        : attendance[0];
    flakiest =
      attendance[attendance.length - 1].commitmentScore ===
      attendance[attendance.length - 2].commitmentScore
        ? {
            name: "it's too close to call!",
            commitmentScore: attendance[attendance.length - 1].commitmentScore,
            imageId: "qb3bao7kv87dznw2jnl8"
          }
        : attendance[attendance.length - 1];
  }

  return (
    <Commitment
      flakiest={flakiest}
      keenest={keenest}
      attendance={attendance.slice(0, 10)}
      activities={commitment_activities}
      commitment={commitment}
      title={title}
      submitVote={submitVote}
      members={activeMembers}
      user={user}
      userCommitmentScore={
        commitment.attendance ? commitment.attendance[user.id] : 100
      }
      submitActivity={submitActivity}
      getActivities={getActivities}
    />
  );
}

function Commitments({ match, state, setTitle, Link }) {
  if (document.title !== "Commitments") {
    setTitle("Commitments");
  }

  const commitments = {};

  for (const id in state.commitments) {
    if (state.commitments[id] && state.commitments[id].joined) {
      commitments[id] = state.commitments[id];
    }
  }

  // Filter for active members who have joined a commitment
  const activeMembers = Object.values(state.members).filter(
    member => member.avatar_url
  );

  return (
    <CommitmentList
      commitments={commitments}
      members={activeMembers}
      Link={Link}
      match={match}
    />
  );
}

function Notifications({
  match,
  activities,
  setTitle,
  submitVote,
  members,
  user,
  notifications,
  commitments,
  invitations,
  getActivities,
  getNotifications,
  acceptCommitmentInvitation,
  declineCommitmentInvitation
}) {
  if (document.title !== "Notifications") {
    setTitle("Notifications");
  }

  // Filter for active members who have joined a commitment
  const activeMembers = Object.values(members).filter(
    member => member.avatar_url
  );

  const memberObject = {};
  activeMembers.forEach(member => {
    memberObject[member.id] = member;
  });

  return (
    <NotificationList
      notifications={notifications}
      commitments={commitments}
      invitations={invitations}
      activities={activities}
      members={memberObject}
      submitVote={submitVote}
      getActivities={getActivities}
      getNotifications={getNotifications}
      user={user}
      acceptCommitmentInvitation={acceptCommitmentInvitation}
      declineCommitmentInvitation={declineCommitmentInvitation}
    />
  );
}

function NewCommitment({ history, setNewCommitment, setTitle }) {
  if (document.title !== "New Commitment") {
    setTitle("New Commitment");
  }
  return (
    <NewCommitmentForm history={history} setNewCommitment={setNewCommitment} />
  );
}

function ProfilePage({
  user,
  setTitle,
  numberOfCommitments,
  numberOfActivities,
  members,
  loading
}) {
  if (document.title !== "Profile") {
    setTitle("Profile");
  }

  let userCommitmentScore = findUserCommitmentScore(user.email, members);

  return loading === false ? (
    <Profile
      user={user}
      numberOfActivities={numberOfActivities}
      numberOfCommitments={numberOfCommitments}
      userCommitmentScore={userCommitmentScore}
    />
  ) : (
    <div></div>
  );
}

function LeaderBoardPage({ setTitle, members, user }) {
  if (document.title !== "Leaderboard") {
    setTitle("Leaderboard");
  }
  let attendance = [];
  for (const id in members) {
    const name = members[id].first_name;
    if (name) {
      const commitmentScore = members[id].commitment_score;
      const imageId = members[id].avatar_url;
      attendance.push({ name, commitmentScore, imageId });
    }
  }
  attendance = attendance.sort((a, b) => b.commitmentScore - a.commitmentScore);
  const keenest =
    attendance[0] &&
    attendance[0].commitmentScore === attendance[1].commitmentScore
      ? {
          name: "It's too close to call!",
          commitmentScore: attendance[0].commitmentScore,
          imageId: "qb3bao7kv87dznw2jnl8"
        }
      : attendance[0];
  const flakiest =
    attendance[0] &&
    attendance[attendance.length - 1].commitmentScore ===
      attendance[attendance.length - 2].commitmentScore
      ? {
          name: "It's too close to call!",
          commitmentScore: attendance[attendance.length - 1].commitmentScore,
          imageId: "qb3bao7kv87dznw2jnl8"
        }
      : attendance[attendance.length - 1];

  let userCommitmentScore = findUserCommitmentScore(user.email, members);

  return (
    <Leaderboard
      flakiest={flakiest}
      keenest={keenest}
      attendance={attendance.slice(0, 10)}
      title={document.title}
      userName={user.first_name}
      userCommitmentScore={userCommitmentScore}
    />
  );
}

export default App;
