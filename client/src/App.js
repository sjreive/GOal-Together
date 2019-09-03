import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import classes from "./App.module.scss";

import TopNav from "./components/nav_bar/TopNav";
import BottomNav from "./components/nav_bar/BottomNav";
import NewCommitmentForm from "./components/new_commitment_form/index";

function App() {
  const { 
    state,
    setTitle,
    setNewCommitment
   } = useApplicationData();

  useEffect(() => {
    document.title = state.title
  }, [state.title])
  
  return (
    <Router>
      <TopNav/>
      <Route 
        exact path="/" 
        render={props => <Home {...props} setTitle={setTitle} />}
      />
      <Route
        exact path="/commitments"
        render={props => <Commitments {...props} state={state} setTitle={setTitle} />}
      />
      <Route 
        path="/notifications" 
        render={props => <Notifications {...props} setTitle={setTitle} />}
      />
      <Route 
        path="/commitments/new" 
        render={props => <NewCommitment {...props} setTitle={setTitle} setNewCommitment={setNewCommitment} />}
      />
      <Route 
        path="/profile" 
        render={props => <Profile {...props} setTitle={setTitle} />}
      />
      <Route 
        path="/transactions" 
        render={props => <Transactions {...props} setTitle={setTitle} />}
      />

      <BottomNav Link={Link}/>
    </Router>
  );
}

function Home({ match, setTitle }) {
  if (document.title !== "Home") {
    setTitle("Home") 
  }
  return (
    <div>
      <h2>Home</h2>
      <div className={classes.bigSquare} />
    </div>
  );
}

function Commitment({ match }) {
  return <h2>Commitment ${match.params.id} </h2>;
}

function Commitments({ match, state, setTitle }) {
  if (document.title !== "Commitments") {
    setTitle("Commitments") 
  }

  return (
    <div>
      <h2>Commitments</h2>
      <p></p>
      <ul>
        <li>
          <Link to={`${match.url}/new`}>Create a New Commitment</Link>
        </li>
        <li>
          {state.commitments[0] ? state.commitments[0].name : "Waiting.."}
        </li>
        {state.votes[0]
          ? state.votes.map(vote => <li>{vote.id}</li>)
          : "Waiting.."}
      </ul>
      <Route path={`${match.path}/:id`} component={Commitment} />
      <Route
        exact
        path={match.path}
        render={() => (
          <h3>
            This will render the commitment that is clicked on $
            {match.params.id}
          </h3>
        )}
      />
    </div>
  );
}

function Notifications({ match, state, setTitle }) {
  if (document.title !== "Notifications") {
    setTitle("Notifications") 
  }
  return <h2>My Notifications</h2>;
}

function NewCommitment({ setNewCommitment, setTitle }) {
  if (document.title !== "New Commitment") {
    setTitle("New Commitment") 
  }
  return (<section className={classes.newCommitmentSection} ><NewCommitmentForm setNewCommitment={setNewCommitment}/></section>);
}

function Profile({ match, state, setTitle }) {
  if (document.title !== "Profile") {
    setTitle("Profile") 
  }
  return <h2>My Profile</h2>;
}

function Transactions({ match, state, setTitle }) {
  if (document.title !== "Transactions") {
    setTitle("Transactions") 
  }
  return <h2>My Transactions</h2>;
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
    </ul>
  );
}

export default App;
