import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ITodo, todoAtom } from '../../store/atom';
import DragCard from '../atom/DragCard';

const Wrapper = styled.div`
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

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  background-color: ${props =>
    props.isDraggingOver
      ? '#dfe6e9'
      : props.isDraggingFromThis
      ? '#b2bec3'
      : 'transparent'};
  transition: background-color 0.3s ease-in-out;
  border-radius: 5px;
`;

const Form = styled.form`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px 5px;
  background-color: ${props => props.theme.cardColor};
  input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 10px;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  const setToDos = useSetRecoilState(todoAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    const newTodo = { id: Date.now(), text: toDo };
    setToDos(oldTodos => {
      return { ...oldTodos, [boardId]: [...oldTodos[boardId], newTodo] };
    });
    setValue('toDo', '');
  };
  return (
    <Draggable draggableId={boardId.toString()} index={index}>
      {(magic, info) => (
        <Wrapper
          {...magic.dragHandleProps}
          {...magic.draggableProps}
          ref={magic.innerRef}
        >
          <Title>{boardId}</Title>
          <Droppable droppableId={boardId} type="tesk">
            {(magic, info) => (
              <Area
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DragCard
                    key={toDo.id}
                    index={index}
                    id={toDo.id}
                    text={toDo.text}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
          {boardId === 'ToDo' && (
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register('toDo', { required: true })}
                type="text"
                placeholder={`Add task on ${boardId}`}
              />
            </Form>
          )}
        </Wrapper>
      )}
    </Draggable>
  );
}
export default Board;
