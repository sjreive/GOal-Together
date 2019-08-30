import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/commitments" component={Commitments} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/newsfeed" component={Newsfeed} />
        <Route path="/stats" component={Stats} />
        <Route path="/transactions" component={Transactions} />
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Commitment({ match }) {
  return <h2>Commitment ${match.params.id} </h2>;
}

function Commitments({ match }) {
  return (
    <div>
      <h2>Commitments</h2>

      <ul>
        <li>
          <Link to={`${match.url}/new`}>Create a New Commitment</Link>
        </li>
        <li>RENDERED COMMITMENTS</li>
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
