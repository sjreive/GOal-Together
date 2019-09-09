import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import classes from "./App.module.scss";

import ActivityList from "./components/activity/ActivityList";
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

function App() {
  const {
    state,
    setTitle,
    setNewCommitment,
    getNotifications,
    getCommitment,
    setUser,
    submitVote
  } = useApplicationData();
  console.log(state);
  useEffect(() => {
    document.title = state.title;
  }, [state.title]);

  useEffect(() => {
    getNotifications();
  }, [state.activities]);

  return (
    <Router>
      <TopNav Link={Link} user={state.user} />
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
            <Commitments {...props} state={state} setTitle={setTitle} />
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
                attendance={state.attendance}
                title={state.title}
                commitments={state.commitments}
                setTitle={setTitle}
                getNotifications={getNotifications}
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
              activities={state.activities}
              setTitle={setTitle}
              submitVote={submitVote}
              members={state.members}
              user={state.user}
              notifications={state.notifications}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />

      <Route
        exact
        path="/profile"
        render={props =>
          state.user && state.user.id ? (
            <ProfilePage {...props} 
            setTitle={setTitle}
            user={state.user}
            numberOfCommitments={Object.keys(state.commitments).length}
            numberOfActivities={Object.keys(state.activities).length}
            members={state.members}
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
            <LeaderBoardPage {...props} attendance={state.attendance} setTitle={setTitle} />
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
      <BottomNav notifications={state.notifications} Link={Link} />
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
  attendance,
  title,
  setTitle,
  getNotifications
}) {
  const commitment = commitments[parseInt(match.params.commitmentId, 10)];

  if (commitment && document.title !== commitment.name) {
    setTitle(commitment.name);
  }

  return (
    <Commitment commitment={commitment} attendance={attendance} title={title} />
  );
}

function Commitments({ match, state, setTitle, getNotifications }) {
  if (document.title !== "Commitments") {
    setTitle("Commitments");
  }

  return (
    <div>
      <h2>Commitments</h2>
      {/* Button to Create new commitments will go here */}
      <Link to={`${match.url}/new`}>Create a New Commitment</Link>
      <br></br>
      <Link to={`${match.url}/1`}>First Commitment</Link>
      {/* SECTION/DIV That will return contain list of commitments */}
      <CommitmentList commitments={state.commitments} members={state.members} />
    </div>
  );
}

function Notifications({
  match,
  activities,
  setTitle,
  submitVote,
  members,
  user,
  notifications
}) {
  if (document.title !== "Notifications") {
    setTitle("Notifications");
  }
  return (
    <ActivityList
      notifications={notifications}
      activities={activities}
      members={members}
      submitVote={submitVote}
      user={user}
    />
  );
}

function NewCommitment({ history, setNewCommitment, setTitle }) {
  if (document.title !== "New Commitment") {
    setTitle("New Commitment");
  }
  return <NewCommitmentForm history={history} setNewCommitment={setNewCommitment} />;
}

function ProfilePage({ user, setTitle, numberOfCommitments, numberOfActivities, members }) {
  if (document.title !== "Profile") {
    setTitle("Profile");
  }
  let userCommitmentScore = 0;
  for (const member in members) {
    if (members[member].email === user.email) {
      userCommitmentScore = members[member].commitment_score
    }
  }
  return <Profile user={user} numberOfActivities={numberOfActivities} numberOfCommitments={numberOfCommitments} userCommitmentScore={userCommitmentScore} />;
}

function LeaderBoardPage({ attendance, setTitle }) {
  if (document.title !== "Leaderboard") {
    setTitle("Leaderboard");
  }
  return <Leaderboard attendance={attendance} title={document.title}/>;
}

export default App;
