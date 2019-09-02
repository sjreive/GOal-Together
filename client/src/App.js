import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import classes from "./App.module.scss";
import CommitmentList from "./components/commitment/CommitmentList";
import VoterCard from "./components/vote/voterCard";

function App() {
  const { state } = useApplicationData();
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route
          path="/commitments"
          render={props => <Commitments {...props} state={state} />}
        />
        <Route path="/notifications" component={Notifications} />
        <Route path="/newsfeed" component={Newsfeed} />
        <Route path="/stats" component={Stats} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/vote" component={Vote} />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <div className={classes.bigSquare} />
    </div>
  );
}

function Vote(state) {
  return (
    <div>
      <h2>VOTE!</h2>
      {/* will also need to pass info about activity id */}
      <VoterCard
        members={state.members}
        user={state.user}
        activity={state.activity}
      />
    </div>
  );
}

function Commitment({ match }) {
  return <h2>Commitment ${match.params.id} </h2>;
}

function Commitments({ match, state }) {
  console.log(state ? state : "");
  console.log(state ? state.commitments[0] : "");
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

function Notifications() {
  return <h2>My Notifications</h2>;
}

function Newsfeed() {
  return <h2>My Newsfeed</h2>;
}

function Stats() {
  return <h2>My Stats</h2>;
}

function Transactions() {
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
