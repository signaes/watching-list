import { PROJECT } from '../constants';

const { HASH, TITLE } = PROJECT;
const STORAGE_KEY_PREFIX = `@${HASH}-${(TITLE as string).replace(' ', '-')}`;

const storage = {
  set: (key: string, data: any) => localStorage
    .setItem(`${STORAGE_KEY_PREFIX}/${key}`, JSON.stringify(data)),
    get: (key: string): { [key: string]: any } | null => {
    const item = localStorage.getItem(`${STORAGE_KEY_PREFIX}/${key}`);

    return item === null ? item : JSON.parse(item);
  },
  remove: (key: string) => localStorage.removeItem(`${STORAGE_KEY_PREFIX}/${key}`),
};

export default storage;
