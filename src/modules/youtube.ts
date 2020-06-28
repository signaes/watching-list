import axios from 'axios';

const baseParams = {
  part: 'snippet',
  type: 'video',
  maxResults: 16,
  key: process.env.YOUTUBE_DATA_API_KEY,
};
const baseURL = 'https://www.googleapis.com/youtube/v3/';

interface Params {
  [key: string]: string;
}
interface Options {
  params: Params;
}
type Get = (path: string, options: Options) => Promise<any>;
const get: Get  = (path, { params }) => {
    return axios.get(
      `${baseURL}${path}`,
      {
        params: {
          ...baseParams,
          ...params,
        },
      }
    );
  }

const youtube = {
  get,
};

export default youtube;
