import { atom } from 'recoil';

const todoAtom = atom({
  key: 'todo',
  default: ['a', 'b', 'c', 'd', 'e', 'f'],
});

export { todoAtom };
