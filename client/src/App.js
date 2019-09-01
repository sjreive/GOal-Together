import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import classes from "./App.module.scss";

import TopNav from "./components/nav_bar/TopNav"

function App() {
  const { state } = useApplicationData();
  return (
    <Router>
      <TopNav/>
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

function Commitment({ match }) {
  return <h2>Commitment ${match.params.id} </h2>;
}

function Commitments({ match, state }) {
  console.log(state ? state.commitments[0] : "");
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
