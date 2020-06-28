import { Dispatch } from 'redux';
import { youtube } from '../../modules';

export type YoutubeActionTypes = 'YOUTUBE_LOADING' | 'YOUTUBE_ERROR' | 'YOUTUBE_LIST';
export interface YoutubeAction {
  type: YoutubeActionTypes;
  payload: any;
}
export const YOUTUBE_ACTIONS = {
  LOADING: 'YOUTUBE_LOADING' as YoutubeActionTypes,
  ERROR: 'YOUTUBE_ERROR' as YoutubeActionTypes,
  LIST: 'YOUTUBE_LIST' as YoutubeActionTypes,
};
export type SearchYoutube = ({ query }: { query: string }) => (dispatch: Dispatch) => void;

export const search: SearchYoutube = ({ query: q }) => async (dispatch: Dispatch) => {
  dispatch({ type: YOUTUBE_ACTIONS.LOADING });

  try {
    const response = await youtube.get('search', { params: { q } });

    dispatch({ type: YOUTUBE_ACTIONS.LIST, payload: response.data });
  } catch (error) {
    console.error(error);

    dispatch({ type: YOUTUBE_ACTIONS.ERROR, payload: { message: error } });
  }
};
