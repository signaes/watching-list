import { AUTH_ACTIONS, ErrorData, AuthAction, AuthActionTypes, Auth, UserData } from '../../actions/auth';
import storage from '../../modules/storage';

const storageAuthData: { [key: string]: any } | null = storage.get('auth');
const baseInitialState: Auth = {
  loading: false,
  signedIn: false,
  error: null,
  user: {
    displayName: null,
    email: null,
  },
};
const initialState: Auth = storageAuthData
  ? {
    ...baseInitialState,
    signedIn: storageAuthData.signedIn,
    user: storageAuthData.user,
  }
  : baseInitialState;

const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AUTH_ACTIONS.ERROR:
      return {
        ...initialState,
        error: (action.payload.error as ErrorData)
      };
    case AUTH_ACTIONS.LOADING:
      return {
        ...state,
        loading: true
      };
    case AUTH_ACTIONS.SIGN_IN:
      return {
        signedIn: true,
        loading: false,
        user: {
          displayName: action.payload.user.displayName,
          email: action.payload.user.email,
        },
      };
    case AUTH_ACTIONS.SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
