import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import classes from "./App.module.scss";
import CommitmentList from "./components/commitment/CommitmentList";
import VoterCard from "./components/vote/voterCard";

import TopNav from "./components/nav_bar/TopNav";
import BottomNav from "./components/nav_bar/BottomNav";
import NewCommitmentForm from "./components/new_commitment_form/index";
import Profile from "./components/profile/index";

function App() {
  const {
    state,
    setTitle,
    setNewCommitment,
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
        render={props => <Home {...props} setTitle={setTitle} />}
      />
      <Route
        exact
        path="/commitments"
        render={props => (
          <Commitments {...props} state={state} setTitle={setTitle} />
        )}
      />
      <Route
        path="/notifications"
        render={props => <Notifications {...props} setTitle={setTitle} />}
      />
      <Route
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
        path="/profile"
        render={props => <ProfilePage {...props} setTitle={setTitle} state={state} />}
      />
      <Route
        path="/transactions"
        render={props => <Transactions {...props} setTitle={setTitle} />}
      />
      <Route
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

function Home({ match, setTitle }) {
  if (document.title !== "Home") {
    setTitle("Home");
  }
  return (
    <div>
      <h2>Home</h2>
      <div className={classes.bigSquare} />
    </div>
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

function Commitment({ match }) {
  return <h2>Commitment ${match.params.id} </h2>;
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
      {/* SECTION/DIV That will return contain list of commitments */}
      <CommitmentList commitments={state.commitments} members={state.members} />

      <Route path={`${match.path}/:id`} component={Commitment} />
      <Route
        exact
        path={match.path}
        render={() => (
          <h3>
            This will render the commitment that is clicked on
            {match.params.id}
          </h3>
        )}
      />
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
  return (
    <section className={classes.newCommitmentSection}>
      <NewCommitmentForm setNewCommitment={setNewCommitment} />
    </section>
  );
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
