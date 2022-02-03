import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export function App() {
  const onDragEnd = () => {
    return;
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {magic => (
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {magic => (
                  <li
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                  >
                    Holle
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="scond" index={1}>
                {magic => (
                  <li
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                  >
                    Holle1
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
