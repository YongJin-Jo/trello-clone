import { atom } from 'recoil';
import { localStorageEffect } from './localstoage';

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

export const todoAtom = atom<IToDoState>({
  key: 'toDo',
  default: {
    ToDo: [],
    doing: [],
    done: [],
  },
  effects_UNSTABLE: [localStorageEffect('todoAtom')],
});

export const TableAtom = atom({
  key: 'table',
  default: [
    { ToDo: [{ id: 1, text: 'hello' }] },
    { Doing: [{ id: 2, text: 'hello' }] },
    { Done: [{ id: 3, text: 'hello' }] },
  ],
});
