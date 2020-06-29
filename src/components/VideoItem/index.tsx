import * as React from 'react';
import VideoInfo from '../VideoInfo';
import Display from '../Display';

const VideoItem: React.SFC<{
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: Date;
  thumbnailURL: string;
  onClick: () => any;
  onSaveVideo: () => any;
  showSaveForLater?: boolean;
  alreadySaved?: boolean;
}> = ({
  title,
  description,
  channelTitle,
  publishedAt,
  thumbnailURL,
  onClick: handleClick,
  onSaveVideo: handleSaveVideo,
  showSaveForLater = false,
  alreadySaved = false,
}) => (
  <article
    className="flex flex-col cursor-pointer group"
  >
    <div className="mb-4 overflow-hidden shadow-lg transition duration-300 transition-transform scale-100 transform rounded-md group-hover:scale-110">
      <button
        className="block"
        onClick={handleClick}
      >
        <img
          className="block"
          src={thumbnailURL}
          alt={title}
        />
      </button>
    </div>
    <VideoInfo
      title={title}
      description={description}
      channelTitle={channelTitle}
      publishedAt={publishedAt}
    />
    <Display condition={showSaveForLater}>
      <div className="mt-4">
        <button type="button" className="hover:underline" onClick={handleSaveVideo}>
          Save for Later
        </button>
      </div>
    </Display>
    <Display condition={alreadySaved}>
      <div className="mt-4 text-green-600">
        Already saved!
      </div>
    </Display>
  </article>
);

export default VideoItem;
