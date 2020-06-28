import { Dispatch } from 'redux'
import { signInWithGoogle, signOut, auth, firestore } from '../../modules/firebase';

let unsubscribe: () => any

export interface UserData {
  displayName: string | null;
  email: string | null;
};
export interface ErrorData {
  message: any;
}
export interface Auth {
  loading: boolean;
  signedIn: boolean;
  user: UserData;
  error: ErrorData | null;
}
export type AuthActionTypes = 'AUTH_LOADING' | 'AUTH_SIGN_IN' | 'AUTH_SIGN_OUT' | 'AUTH_ERROR';
export interface AuthAction {
  type: AuthActionTypes;
  payload: Auth;
}

export const AUTH_ACTIONS = Object.freeze({
  LOADING:  'AUTH_LOADING' as AuthActionTypes,
  SIGN_IN:  'AUTH_SIGN_IN' as AuthActionTypes,
  SIGN_OUT: 'AUTH_SIGN_OUT' as AuthActionTypes,
  ERROR:    'AUTH_ERROR' as AuthActionTypes,
})

export const signInUser = () => async (dispatch: Dispatch) => {
  dispatch({ type: AUTH_ACTIONS.LOADING });

  try {
    signInWithGoogle();

    unsubscribe = auth.onAuthStateChanged(async (userAuth: any) => {
      if (!userAuth) { return; }

      const { uid, displayName, email, refreshToken } = userAuth;
      const userRef = await firestore.doc(`/users/${uid}`);
      const snapshot: firebase.firestore.DocumentSnapshot = await userRef.get();
      const user = { uid, displayName, email, refreshToken }

      if (snapshot.exists) {
        return dispatch({
          type: AUTH_ACTIONS.SIGN_IN,
          payload: { user }
        });
      }

      const createdAt = new Date();
      const response = await userRef.set({
        displayName,
        email,
        createdAt,
        refreshToken,
      })

      return dispatch({
        type: AUTH_ACTIONS.SIGN_IN,
        payload: { user }
      });
    });
  } catch (error) {
    const {
      code,
      message,
      email,
      credential,
    } = error;

    dispatch({
      type: AUTH_ACTIONS.ERROR,
      payload: { message }
    });
  }
};

export const signOutUser = () => async (dispatch: Dispatch) => {
  dispatch({ type: AUTH_ACTIONS.LOADING });

  try {
    const response = await signOut();

    unsubscribe();

    dispatch({ type: AUTH_ACTIONS.SIGN_OUT });
  } catch (error) {
    console.error(error);
  }
};
