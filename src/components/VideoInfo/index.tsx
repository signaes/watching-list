import * as React from 'react';
import moment from 'moment';

const VideoInfo: React.SFC<{
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: Date;
}> = ({
  title,
  description,
  channelTitle,
  publishedAt,
}) => (
  <>
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
  </>
);

export default VideoInfo;
