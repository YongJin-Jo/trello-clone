import { atom } from 'recoil';

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const todoAtom = atom<IToDoState>({
  key: 'toDo',
  default: {
    to_do: [
      { id: 1, text: '공부하기' },
      { id: 2, text: '공부하기' },
    ],
    doing: [{ id: 3, text: '공부하기' }],
    done: [],
  },
});
