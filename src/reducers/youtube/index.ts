import {
  YOUTUBE_ACTIONS, YoutubeActionTypes, YoutubeAction
} from '../../actions/youtube';

const initialState: any = {
  loading: false,
  error: null,
};

const youtubeReducer = (state = initialState, action: YoutubeAction) => {
  switch (action.type) {
    case YOUTUBE_ACTIONS.ERROR:
      return {
        ...initialState,
        error: action.payload.error
      };
    case YOUTUBE_ACTIONS.LOADING:
      return {
        ...state,
        loading: true
      };
    case YOUTUBE_ACTIONS.LIST:
      return {
        ...state,
        loading: false,
        list: action.payload
      };
    default:
      return state;
  }
};

export default youtubeReducer;
