import * as React from 'react';
import VideoInfo from '../VideoInfo';

const VideoItem: React.SFC<{
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: Date;
  thumbnailURL: string;
  onClick: () => any;
}> = ({
  title,
  description,
  channelTitle,
  publishedAt,
  thumbnailURL,
  onClick: handleClick,
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
  </article>
);

export default VideoItem;
