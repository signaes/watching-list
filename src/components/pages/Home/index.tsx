import * as React from 'react';
import { isEmpty } from 'lodash';
import { Helmet } from 'react-helmet';
import { PROJECT } from '../../../constants';
import Layout, { LayoutContextProps } from '../../Layout';
import Wrapper from '../../Layout/Wrapper';
import SearchBox from '../../forms/SearchBox';
import VideoItem from '../../VideoItem';
import VideoModal from '../../VideoModal';

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

const Home: React.SFC = () => {
  const [modal, setModal] = useState({});
  const closeModal = () => setModal({});
  const handleVideoClick = (data: ModalData) => () => setModal(data);
  const isModalEmpty = isEmpty(modal);

  return (
    <>
      <Helmet>
        <title>{ PROJECT.TITLE } - Home</title>
      </Helmet>
      <Layout>
        {({
          auth: { user: { displayName } },
          youtube: { loading: youtubeLoading, list },
          searchYoutube,
        }: LayoutContextProps) => (
          <Wrapper className="pt-32 pb-32">
            <header className="mb-16 text-3xl lg:text-5xl">
              <span className="block lg:inline">Welcome</span> {displayName}
            </header>
            <div className="mb-8 lg:mb-24">
              <SearchBox onSearch={searchYoutube} isLoading={youtubeLoading} />
            </div>
            <div className="grid gap-12 grid-cols-1 lg:grid-cols-4">
              {
                list && list.items && list.items.map(({
                  id: { videoId },
                  snippet: {
                    title,
                    description,
                    channelTitle,
                    publishedAt,
                    thumbnails: { high: { url } },
                  },
                }: any) => (
                  <VideoItem
                    key={videoId}
                    title={title}
                    description={description}
                    channelTitle={channelTitle}
                    publishedAt={publishedAt}
                    thumbnailURL={url}
                    onClick={handleVideoClick({
                      title,
                      description,
                      channelTitle,
                      publishedAt,
                      thumbnailURL: url,
                      videoId,
                    })}
                  />
                ))
              }
            </div>
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

export default Home;
