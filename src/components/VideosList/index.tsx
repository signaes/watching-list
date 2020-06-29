import * as React from 'react';
import { isEmpty } from 'lodash';
import { Helmet } from 'react-helmet';
import { PROJECT } from '../../constants';
import Layout, { LayoutContextProps } from '../Layout';
import { VideoData } from '../../actions/watchingList';
import Wrapper from '../Layout/Wrapper';
import SearchBox from '../forms/SearchBox';
import VideoItem from '../VideoItem';
import VideoModal from '../VideoModal';
import Display from '../Display';

const { useState } = React;

interface ModalVideoData {
  title?: string;
  description?: string;
  channelTitle?: string;
  publishedAt?: Date;
  thumbnailURL?: string;
  videoId?: string;
}

type ModalData = React.SetStateAction<ModalVideoData>;

const hasAlreadySaved: (
  videoId: string, list: VideoData[]
) => boolean = (
  videoId, list
) => list.map((item) => item.videoId).includes(videoId);

const VideosList: React.SFC<{
  pageHeadTitle: string;
  title: (props: { displayName: string }) => JSX.Element | JSX.Element;
  hasSearch?: boolean;
  showSavedList?: boolean;
}> = ({
  pageHeadTitle,
  title,
  hasSearch = false,
  showSavedList = false,
}) => {
  const [modal, setModal] = useState({});
  const closeModal = () => setModal({});
  const handleVideoClick = (data: ModalData) => () => setModal(data);
  const isModalEmpty = isEmpty(modal);

  return (
    <>
      <Helmet>
        <title>{ PROJECT.TITLE } - { pageHeadTitle }</title>
      </Helmet>
      <Layout>
        {({
          auth: { user: { displayName } },
          youtube: { loading: youtubeLoading, list },
          searchYoutube,
          saveVideo,
          savedVideos,
        }: LayoutContextProps) => (
          <Wrapper className="pt-32 pb-32">
            <header className="mb-16 text-3xl lg:text-5xl">
              { typeof title === 'function'
                ? title({ displayName: displayName as string })
                : title }
            </header>
            <Display condition={hasSearch || !showSavedList}>
              <div className="mb-8 lg:mb-24">
                <SearchBox onSearch={searchYoutube} isLoading={youtubeLoading} />
              </div>
            </Display>
            <Display condition={!showSavedList}>
              <div className="grid gap-12 grid-cols-1 lg:grid-cols-4">
                {
                  list && list.items && list.items.map(({
                    id: { videoId },
                    snippet: {
                      title: videoTitle,
                      description,
                      channelTitle,
                      publishedAt,
                      thumbnails: { high: { url } },
                    },
                  }: any) => (
                    <VideoItem
                      key={videoId}
                      title={videoTitle}
                      description={description}
                      channelTitle={channelTitle}
                      publishedAt={publishedAt}
                      thumbnailURL={url}
                      onSaveVideo={() => saveVideo({
                        videoId,
                        title: videoTitle,
                        description,
                        channelTitle,
                        publishedAt,
                        thumbnailURL: url,
                      })}
                      onClick={handleVideoClick({
                        title: videoTitle,
                        description,
                        channelTitle,
                        publishedAt,
                        thumbnailURL: url,
                        videoId,
                      })}
                      showSaveForLater={!hasAlreadySaved(videoId, savedVideos)}
                      alreadySaved={hasAlreadySaved(videoId, savedVideos)}
                    />
                  ))
                }
              </div>
            </Display>
            <Display condition={showSavedList}>
              <div className="grid gap-12 grid-cols-1 lg:grid-cols-4">
                {
                  savedVideos && savedVideos.map(({
                    videoId,
                    title: videoTitle,
                    description,
                    channelTitle,
                    publishedAt,
                    thumbnailURL,
                  }: VideoData) => (
                    <VideoItem
                      key={videoId}
                      title={videoTitle}
                      description={description}
                      channelTitle={channelTitle}
                      publishedAt={publishedAt}
                      thumbnailURL={thumbnailURL}
                      onSaveVideo={() => saveVideo({
                        videoId,
                        title: videoTitle,
                        description,
                        channelTitle,
                        publishedAt,
                        thumbnailURL,
                      })}
                      onClick={handleVideoClick({
                        title: videoTitle,
                        description,
                        channelTitle,
                        publishedAt,
                        thumbnailURL,
                        videoId,
                      })}
                    />
                  ))
                }
              </div>
            </Display>
          </Wrapper>
        )}
      </Layout>
      <VideoModal
        isOpen={!isModalEmpty}
        title={(modal as ModalVideoData).title}
        description={(modal as ModalVideoData).description}
        channelTitle={(modal as ModalVideoData).channelTitle}
        publishedAt={(modal as ModalVideoData).publishedAt}
        videoId={(modal as ModalVideoData).videoId}
        onCloseClick={closeModal}
      />
    </>
  );
};

export default VideosList;
