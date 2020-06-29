import * as React from 'react';
import moment from 'moment';

const VideoInfo: React.SFC<{
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: Date;
  fromModal?: boolean;
}> = ({
  title,
  description,
  channelTitle,
  publishedAt,
  fromModal = false,
}) => (
  <>
    <header className="mb-4">
      <h1
        className="mb-2 text-2xl leading-7"
        id={fromModal ? 'dialog-title' : undefined}
      >
        { title }
      </h1>
      <h2
        className="text-gray-600 truncate"
        id={fromModal ? 'dialog-description' : undefined}
      >
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
