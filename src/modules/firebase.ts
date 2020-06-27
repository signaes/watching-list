import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBopJ-sVGZIBBSPj-5rNIbhAmttc3nK9pg',
  authDomain: 'watching-list.firebaseapp.com',
  databaseURL: 'https://watching-list.firebaseio.com',
  projectId: 'watching-list',
  storageBucket: 'watching-list.appspot.com',
  messagingSenderId: '47799628452',
  appId: '1:47799628452:web:2cd75f52aac147d5846c31',
};

firebase.initializeApp(config);

const auth = firebase.auth();
const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const signInWithGoogle = () => auth.signInWithPopup(provider);
const signOut = () => auth.signOut();

export default firebase;
export { auth, firestore, signInWithGoogle, signOut };
