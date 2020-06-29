import * as React from 'react';
import VideosList from '../../VideosList';

const Home: React.SFC = () => (
  <VideosList
    pageHeadTitle="Home"
    title={({ displayName }) => (
      <>
        <span className="block lg:inline">Welcome</span> {displayName}
      </>
    )}
    hasSearch
  />
);

export default Home;
