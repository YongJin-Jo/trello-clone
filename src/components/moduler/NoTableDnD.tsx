import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDoState, todoAtom } from '../../store/atom';
import Board from './Board';

const Wrapper = styled.div``;

const Boards = styled.div<{ isDraggingOver: boolean }>`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  background-color: ${props =>
    props.isDraggingOver
      ? '#dfe6e9'
      : props.isDraggingOver
      ? '#b2bec3'
      : 'transparent'};
  transition: background-color 0.3s ease-in-out;
`;

const NoTableDnD = () => {
  const [toDos, setToDos] = useRecoilState(todoAtom);

  const onDragEnd = ({
    destination,
    draggableId,
    source,
    type,
  }: DropResult) => {
    if (!destination) return;
    console.log(source);
    console.log(destination);
    console.log(draggableId);

    if (type === 'table') {
      setToDos(allBoard => {
        const board = Object.keys(allBoard);
        board.splice(source.index, 1);
        board.splice(destination.index, 0, draggableId);
        const newBorad: IToDoState = {};
        board.forEach(key => {
          newBorad[key] = allBoard[key];
        });
        return newBorad;
      });
      return;
    }
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
      return;
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
      return;
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="table" type="table" direction="horizontal">
          {(magic, info) => (
            <Boards
              isDraggingOver={info.isDraggingOver}
              {...magic.droppableProps}
              ref={magic.innerRef}
            >
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  boardId={boardId}
                  key={boardId}
                  index={index}
                  toDos={toDos[boardId]}
                />
              ))}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
};

export default NoTableDnD;
