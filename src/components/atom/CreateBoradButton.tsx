import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoAtom } from '../../store/atom';

const Button = styled.button`
  position: fixed;
  justify-content: center;
  align-items: center;
  padding: 10px;
  bottom: 10px;
  right: 10px;
  border-radius: 50px;
  border-color: white;
  cursor: pointer;
  span {
    font-size: 2rem;
    padding: 10px;
  }
`;

const CreateBoradButton = () => {
  const setTodos = useSetRecoilState(todoAtom);
  const onClick = () => {
    setTodos(allBord => {
      return {
        ...allBord,
        '': [],
      };
    });
  };
  return (
    <Button onClick={onClick}>
      <span>+</span>
    </Button>
  );
};

export default CreateBoradButton;
