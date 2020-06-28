import * as React from 'react';
import { Helmet } from 'react-helmet';
import { PROJECT } from '../../../constants';
import Layout, { LayoutContextProps } from '../../Layout';
import Wrapper from '../../Layout/Wrapper';
import SearchBox from '../../forms/SearchBox';
import VideoItem from '../../VideoItem';
import Display from '../../Display';

const Home: React.SFC = () => (
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
        <Wrapper className="pb-32">
          <header className="mb-4 text-3xl lg:text-5xl">
            Welcome {displayName}
          </header>
          <SearchBox onSearch={searchYoutube} isLoading={youtubeLoading} />
          <div className="mt-16 grid gap-12 grid-cols-1 lg:grid-cols-4">
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
                />
              ))
            }
          </div>
        </Wrapper>
      )}
    </Layout>
  </>
);

export default Home;
