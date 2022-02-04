import { atom } from 'recoil';

interface IToDoState {
  [key: string]: string[];
}

export const todoAtom = atom<IToDoState>({
  key: 'toDo',
  default: {
    to_do: ['a', 'b'],
    doing: ['c', 'd', 'e'],
    done: ['f'],
  },
});
