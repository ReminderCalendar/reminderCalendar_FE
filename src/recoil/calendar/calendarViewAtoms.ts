import { atom } from 'recoil';

export const isCalendarViewAtom = atom<boolean>({
  key: 'isCalendarViewAtom',
  default: true,
});
