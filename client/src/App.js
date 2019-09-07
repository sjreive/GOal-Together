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

function App() {
  const {
    state,
    setTitle,
    setNewCommitment,
    getCommitment,
    setUser,
    submitVote
  } = useApplicationData();
  console.log(state);
  useEffect(() => {
    document.title = state.title;
  }, [state.title]);

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
          state.user.id ? (
            <Redirect to="/profile" />
          ) : (
            <LoginPage {...props} setUser={setUser} setTitle={setTitle} />
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
          state.user.id ? (
            <Redirect to="/profile" />
          ) : (
            <RegisterPage {...props} setUser={setUser} setTitle={setTitle} />
          )
        }
      />
      <Route
        exact
        path="/commitments"
        render={props =>
          state.user.id ? (
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
            state.user.id ? (
              <NewCommitment
                {...props}
                setTitle={setTitle}
                setNewCommitment={setNewCommitment}
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
            state.user.id ? (
              <CommitmentPage
                {...props}
                attendance={state.attendance}
                title={state.title}
                commitments={state.commitments}
                setTitle={setTitle}
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
          state.user.id ? (
            <Notifications
              {...props}
              activities={state.activities}
              setTitle={setTitle}
              submitVote={submitVote}
              members={state.members}
              user={state.user}
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
          state.user.id ? (
            <ProfilePage {...props} setTitle={setTitle} state={state} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/transactions"
        render={props =>
          state.user.id ? (
            <Transactions {...props} setTitle={setTitle} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />

      <Route
        exact
        path="/vote"
        render={props =>
          state.user.id ? (
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
      <BottomNav Link={Link} />
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

function RegisterPage({ match, setTitle }) {
  if (document.title !== "Register") {
    setTitle("Register");
  }
  return <Register />;
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

function CommitmentPage({ match, commitments, attendance, title, setTitle }) {
  const commitment = commitments[parseInt(match.params.commitmentId, 10)];

  if (commitment && document.title !== commitment.name) {
    setTitle(commitment.name);
  }

  return (
    <Commitment commitment={commitment} attendance={attendance} title={title} />
  );
}

function Commitments({ match, state, setTitle }) {
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
  user
}) {
  if (document.title !== "Notifications") {
    setTitle("Notifications");
  }
  return (
    <ActivityList
      activities={activities}
      members={members}
      submitVote={submitVote}
      user={user}
    />
  );
}

function NewCommitment({ setNewCommitment, setTitle }) {
  if (document.title !== "New Commitment") {
    setTitle("New Commitment");
  }
  return <NewCommitmentForm setNewCommitment={setNewCommitment} />;
}

function ProfilePage({ match, state, setTitle }) {
  if (document.title !== "Profile") {
    setTitle("Profile");
  }

  return <Profile state={state} />;
}

function Transactions({ match, state, setTitle }) {
  if (document.title !== "Transactions") {
    setTitle("Transactions");
  }
  return <h2>My Transactions</h2>;
}

export default App;
