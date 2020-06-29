import firebase  from '../../modules/firebase';

const { database } = firebase;

export interface VideoData {
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: Date;
  videoId: string;
  thumbnailURL: string;
}

type SaveVideo = (userId: string) => (videoData: VideoData) => void;

export const saveVideo: SaveVideo = (userId) => (videoData) => {
  const ref = database().ref(`users/${userId}`);
  const newSavedVideoKey = ref.child('savedVideos').push().key;

  const updates = {
    [`/users/${userId}/savedVideos/${newSavedVideoKey}`]: videoData,
  };

  return database().ref().update(updates);
};

type ReadSavedVideos = (userId: string) => (callback: (snapshotValue: any) => void) => any;

let lastValue = '';

export const onSavedVideosUpdate: ReadSavedVideos = (userId) => (callback) => {
  const ref = database().ref(`users/${userId}/savedVideos`);
  const unsubscribeAll = ref.off('value');

  const listener = ref.on('value', (snapshot) => {
    const value = snapshot.val();
    const stringifiedValue = JSON.stringify(Object.keys(value));

    if (lastValue === stringifiedValue) {
      return () => unsubscribeAll;
    }

    lastValue = stringifiedValue;
    callback(value);
  });

  return () => unsubscribeAll;
};

export const readSavedVideosOnce: ReadSavedVideos = (userId) => (callback) => {
  const ref = database().ref(`users/${userId}/savedVideos`);

  ref.once('value', snapshot => callback(snapshot.val()));
};
