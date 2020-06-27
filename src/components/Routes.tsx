import * as React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { signOutUser, Auth } from '../actions/auth';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Display from './Display';

const Routes: React.SFC<{
  auth: any;
  signOut: any;
}> = ({
  auth,
  signOut,
}) => {
  const { signedIn } = auth;

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Display condition={signedIn}>
            <Home />
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
  {
    signOut: signOutUser,
  },
)(Routes);
