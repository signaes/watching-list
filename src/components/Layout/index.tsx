import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { signOutUser, Auth } from '../../actions/auth';
import { search } from '../../actions/youtube';
import {
  saveVideo,
  onSavedVideosUpdate,
  readSavedVideosOnce,
  VideoData,
} from '../../actions/watchingList';
import { SignOutButton } from '../buttons';
import Wrapper from './Wrapper';
import Display from '../Display';

const { useState, useEffect } = React;

export interface LayoutContextProps {
  auth: Auth;
  youtube: any;
  searchYoutube: any;
  saveVideo: any;
  onSavedVideosUpdate: any;
  savedVideos: VideoData[];
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
}) => {
  const saveUserVideo = saveVideo(auth.user.uid as string);
  const onUserSavedVideosUpdate = onSavedVideosUpdate(auth.user.uid as string);
  const getSavedVideosOnce = readSavedVideosOnce(auth.user.uid as string);
  const [loadingSavedVideos, setLoadingSavedVideos] = useState(true);
  const [savedVideos, setSavedVideos] = useState([] as VideoData[]);
  const savedVideosCount = () => savedVideos.length;

  useEffect(() => getSavedVideosOnce((snapshotValue: any) => {
    setSavedVideos(Object.values(snapshotValue) as VideoData[]);
    setLoadingSavedVideos(false);
  }));

  useEffect(() => onUserSavedVideosUpdate((snapshotValue: any) => {
    const videos = Object.values(snapshotValue) as VideoData[];

    setSavedVideos(videos);
  }), [savedVideos]);

  return (
    <div className={className}>
      <Wrapper>
        <header className="flex items-center justify-between py-8">
          <Display condition={loadingSavedVideos}>
            <div className="flex items-center">
              <ClipLoader
                size={16}
                color="000000"
                loading={loadingSavedVideos}
              />
              <span className="ml-2">Loading saved videos</span>
            </div>
          </Display>
          <Display condition={!loadingSavedVideos}>
            <span>
              {savedVideosCount()} saved video{savedVideosCount() === 1 ? '' : 's'}
            </span>
          </Display>
          <SignOutButton className="self-end" onClick={signOut} />
        </header>
        <nav className="flex">
          <Link to="/" className="mr-4 text-lg lg:text-2xl lg:mr-8">Home</Link>
          <Link to="/saved" className="text-lg lg:text-2xl">Saved Videos</Link>
        </nav>
      </Wrapper>
      {
        typeof children === 'function'
          ? (children as SFC)({
            auth,
            youtube,
            searchYoutube,
            saveVideo: saveUserVideo,
            onSavedVideosUpdate: onUserSavedVideosUpdate,
            savedVideos,
          })
          : children
      }
    </div>
  );
};

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
