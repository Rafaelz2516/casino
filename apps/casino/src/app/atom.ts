import { atom } from 'recoil';

export const isLoggedInAtom = atom({
  key: 'isLoggedInAtom',
  default: false,
});

export const userAtom = atom({
  key: 'userAtom',
  default: {
    username: '',
    birthDate: new Date(),
    balance: 0,
  },
});
