import * as React from 'react';
import { connect } from 'react-redux';
import { signOutUser, Auth } from '../../actions/auth';
import { SignOutButton } from '../buttons';

const Layout: React.SFC<{
  className?: string;
  children: React.Component | React.Component[] | JSX.Element | JSX.Element[] | string;
  auth: Auth;
  signOut: () => void;
}> = ({
  className = '',
  children,
  signOut,
  auth: {
    user: {
      displayName,
    },
  },
}) => (
  <div className={className}>
    <header className="flex items-center justify-between">
      Welcome { displayName }.

      <SignOutButton onClick={signOut} />
    </header>

    { children }
  </div>
);

function mapStateToProps({ auth }: { auth: Auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  {
    signOut: signOutUser,
  },
)(Layout);
