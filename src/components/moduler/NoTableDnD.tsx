import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoAtom } from '../../store/atom';
import Board from './Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const NoTableDnD = () => {
  const [toDos, setToDos] = useRecoilState(todoAtom);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    if (destination.droppableId === source.droppableId) {
      setToDos(allBoard => {
        const boardCopy = [...allBoard[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoard,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos(allBoard => {
        const sourceBoard = [...allBoard[source.droppableId]];
        const taskObj = sourceBoard[source.index];

        const destinationBoard = [...allBoard[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map(boardId => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
};

export default NoTableDnD;
