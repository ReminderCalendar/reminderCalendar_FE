import { atom } from 'recoil';

export const isModalOpenAtom = atom<boolean>({
  key: 'isModalOpenAtom',
  default: false,
});
