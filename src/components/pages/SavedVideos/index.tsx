import * as React from 'react';
import VideosList from '../../VideosList';

const SavedVideos: React.SFC = () => (
  <VideosList
    pageHeadTitle="Saved Videos"
    title={() => (
      <>
        Your saved videos list
      </>
    )}
    showSavedList
    hasSearch={false}
  />
);

export default SavedVideos;
