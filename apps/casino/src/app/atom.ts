import { atom, selector } from 'recoil';

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

export const userBalance = selector({
  key: 'userBalance',
  get: ({ get }) => get(userAtom).balance,
});
