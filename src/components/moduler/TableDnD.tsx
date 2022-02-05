import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { TableAtom } from '../../store/atom';
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

const BoradTable = styled.div`
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

const Table = () => {
  const tableSatate = useRecoilValue(TableAtom);
  const onDragEnd = (data: any) => {
    console.log(data);
  };
  console.log(tableSatate);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="one">
          {magic => (
            <Boards {...magic.droppableProps} ref={magic.innerRef}>
              {tableSatate.map((item, index) => (
                <Draggable draggableId={index.toString()} index={index}>
                  {magic => (
                    <BoradTable
                      {...magic.draggableProps}
                      ref={magic.innerRef}
                      key={index}
                    >
                      {item}
                    </BoradTable>
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
