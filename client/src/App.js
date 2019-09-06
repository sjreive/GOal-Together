import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import classes from "./App.module.scss";
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
    submitVote
  } = useApplicationData();

  useEffect(() => {
    document.title = state.title;
  }, [state.title]);

  return (
    <Router>
      <TopNav />
      <Route
        exact
        path="/"
        render={() => {
          
        }}
      />
      <Route
        exact
        path="/login"
        render={props => (
          <LoginPage {...props} state={state} setTitle={setTitle} />
        )}
      />
      <Route
        exact
        path="/logout"
        render={props => (
          <LogoutPage {...props} state={state} setTitle={setTitle} />
        )}
      />
      <Route
        exact
        path="/register"
        render={props => (
          <RegisterPage {...props} state={state} setTitle={setTitle} />
        )}
      />
      <Route
        exact
        path="/commitments"
        render={props => (
          <Commitments {...props} state={state} setTitle={setTitle} />
        )}
      />
      <Switch>
        <Route
          exact
          path="/commitments/new"
          render={props => (
            <NewCommitment
              {...props}
              setTitle={setTitle}
              setNewCommitment={setNewCommitment}
            />
          )}
        />
        <Route
          exact
          path={`/commitments/:commitmentId`}
          render={props => (
            <CommitmentPage 
              {...props}
              state={state} 
              setTitle={setTitle}
              getCommitment={getCommitment}
            />
          )}
        />
      </Switch>
      <Route
        exact
        path="/notifications"
        render={props => <Notifications {...props} setTitle={setTitle} />}
      />
      
      <Route
        exact
        path="/profile"
        render={props => {
          return <ProfilePage {...props} setTitle={setTitle} state={state}  />
        }}
      />
      <Route
        exact
        path="/transactions"
        render={props => <Transactions {...props} setTitle={setTitle} />}
      />
      
      <Route
        exact
        path="/vote"
        render={props => (
          <Vote
            {...props}
            state={state}
            setTitle={setTitle}
            submitVote={submitVote}
          />
        )}
      />
      <BottomNav Link={Link} />
    </Router>
  );
}

function LoginPage({ match, setTitle }) {
  if (document.title !== "Login") {
    setTitle("Login");
  }
  return (
    <Login/>
  );
};

function LogoutPage({ match, setTitle }) {
  if (document.title !== "Logout") {
    setTitle("Logout");
  }
  return (
    <Logout/>
  );
}

function RegisterPage({ match, setTitle }) {
  if (document.title !== "Register") {
    setTitle("Register");
  }
  return (
    <Register/>
  );
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

function CommitmentPage({ match, state, setTitle, getCommitment }) {
  const commitment = state.commitments.find(c => c.id === parseInt(match.params.commitmentId, 10));

  if (commitment && document.title !== commitment.name) {
    setTitle(commitment.name);
  }
  
  return <Commitment commitment={commitment} attendance={state.attendance} title={state.title} />;
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

function Notifications({ match, state, setTitle }) {
  if (document.title !== "Notifications") {
    setTitle("Notifications");
  }
  return <h2>My Notifications</h2>;
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

  return <Profile state={state}/>;
}

function Transactions({ match, state, setTitle }) {
  if (document.title !== "Transactions") {
    setTitle("Transactions");
  }
  return <h2>My Transactions</h2>;
}

export default App;
