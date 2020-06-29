import * as React from 'react';
import Modal from '../Modal';
import VideoInfo from '../VideoInfo';

const VideoModal: React.SFC<{
  isOpen: boolean;
  title?: string;
  description?: string;
  channelTitle?: string;
  publishedAt?: Date;
  videoId?: string;
  onCloseClick: () => any;
}> = ({
  isOpen,
  title = '',
  description = '',
  channelTitle = '',
  publishedAt = new Date(),
  videoId,
  onCloseClick: handleCloseClick,
}) => (
  <Modal isOpen={isOpen} onCloseClick={handleCloseClick}>
    <iframe
      className="w-full h-full"
      title={title}
      id="player"
      src={`http://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allowFullScreen
    />
    <div className="p-8">
      <VideoInfo
        title={title}
        description={description}
        channelTitle={channelTitle}
        publishedAt={publishedAt}
        fromModal
      />
    </div>
  </Modal>
);

export default VideoModal;
