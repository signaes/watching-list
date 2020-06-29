import * as React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Auth } from '../actions/auth';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import SavedVideos from './pages/SavedVideos';
import Display from './Display';

const Routes: React.SFC<{
  auth: any;
}> = ({
  auth,
}) => {
  const { signedIn } = auth;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Display condition={signedIn}>
            <Home />
          </Display>
          <Display condition={!signedIn}>
            <SignIn />
          </Display>
        </Route>
        <Route exact path="/saved">
          <Display condition={signedIn}>
            <SavedVideos />
          </Display>
          <Display condition={!signedIn}>
            <SignIn />
          </Display>
        </Route>
      </Switch>
    </Router>
  );
};

function mapStateToProps({ auth }: { auth: Auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
)(Routes);
