import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { PROJECT } from '../../../constants';
import {
} from 'react-router-dom';
import { signInUser } from '../../../actions/auth';
import { SignInButton } from '../../buttons';

const SignIn: React.SFC<{ signIn: () => void; }> = ({ signIn }) => (
  <>
    <Helmet>
      <title>{ PROJECT.TITLE } - Sign in</title>
    </Helmet>
    <div className="inset-0 flex flex-col items-center justify-center w-full h-full">
      <div className="mb-10">
        <div className="mb-10 text-4xl leading-8">
          Watching
          <br />
          List
        </div>
        <SignInButton onClick={signIn} />
      </div>
    </div>
  </>
);

export default connect(
  null,
  { signIn: signInUser },
)(SignIn);
