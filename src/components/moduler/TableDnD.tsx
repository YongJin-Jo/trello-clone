import React from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { TableAtom } from '../../store/atom';

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div<{ isDraggingOver: boolean }>`
  background-color: ${props => (props.isDraggingOver ? 'red' : '')};

  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const Card = styled.div`
  display: flex;
  padding: 20px 10px;
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const arr = [1, 2, 3];

const Table = () => {
  const tableSatate = useRecoilValue(TableAtom);
  const onDragEnd = (data: DropResult) => {
    console.log(data);

    return;
  };
  console.log(tableSatate);

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
              {arr.map((item, index) => (
                <Draggable
                  draggableId={index.toString()}
                  index={index}
                  key={index}
                >
                  {(magic, info) => (
                    <Card
                      {...magic.dragHandleProps}
                      {...magic.draggableProps}
                      ref={magic.innerRef}
                    >
                      {item}
                    </Card>
                  )}
                </Draggable>
              ))}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
};

export default Table;
