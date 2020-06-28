import { AUTH_ACTIONS, ErrorData, AuthAction, AuthActionTypes, Auth, UserData } from '../../actions/auth';

const initialState: Auth = {
  loading: false,
  signedIn: false,
  user: {
    displayName: null,
    email: null,
  },
  error: null,
};

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
