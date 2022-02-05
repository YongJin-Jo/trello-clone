import React from 'react';
import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${props =>
    props.isDragging ? '#74b9ff' : props.theme.cardColor};
`;

interface ICradProps {
  id: number;
  text: string;
  index: number;
}

const DragCard = ({ id, text, index }: ICradProps) => {
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {text}
        </Card>
      )}
    </Draggable>
  );
};

export default memo(DragCard);
