import * as React from 'react';
import moment from 'moment';

const VideoItem: React.SFC<{
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: Date;
  thumbnailURL: string;
}> = ({
  title,
  description,
  channelTitle,
  publishedAt,
  thumbnailURL,
}) => (
  <article className="flex flex-col cursor-pointer group">
    <div className="mb-4 overflow-hidden shadow-lg transition duration-500 transition-transform scale-100 transform rounded-md group-hover:scale-110">
      <img
        className="block"
        src={thumbnailURL}
        alt={title}
      />
    </div>
    <header className="mb-4">
      <h1 className="mb-2 text-2xl leading-7">
        { title }
      </h1>
      <h2 className="text-gray-600 truncate">
        { description }
      </h2>
    </header>
    <aside className="flex items-center text-gray-500">
      <small className="mr-8">By { channelTitle }</small>
      <small>{ moment(publishedAt).format('MMM YYYY') }</small>
    </aside>
  </article>
);

export default VideoItem;
