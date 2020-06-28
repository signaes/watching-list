import * as React from 'react';
import { connect } from 'react-redux';
import { signOutUser, Auth } from '../../actions/auth';
import { search } from '../../actions/youtube';
import { SignOutButton } from '../buttons';
import Wrapper from './Wrapper';

export interface LayoutContextProps {
  auth: Auth;
  youtube: any;
  searchYoutube: any;
}
type SFC = (props: LayoutContextProps) => (
  React.Component | React.Component[] | JSX.Element | JSX.Element[] | string | Element | React.Component<unknown, unknown, any>
);

const Layout: React.SFC<{
  className?: string;
  children: React.Component | React.Component[] | JSX.Element | JSX.Element[] | SFC | string;
  auth: Auth;
  youtube: any;
  signOut: () => void;
  searchYoutube: any;
}> = ({
  className = '',
  children,
  auth,
  youtube,
  signOut,
  searchYoutube,
}) => (
  <div className={className}>
    <Wrapper>
      <header className="flex items-center justify-end py-8">
        <SignOutButton className="self-end" onClick={signOut} />
      </header>
    </Wrapper>
    { typeof children === 'function' ? (children as SFC)({ auth, youtube, searchYoutube }) : children }
  </div>
);

function mapStateToProps({ auth, youtube }: { auth: Auth, youtube: any }) {
  return {
    auth,
    youtube,
  };
}

export default connect(
  mapStateToProps,
  {
    signOut: signOutUser,
    searchYoutube: search,
  },
)(Layout);
