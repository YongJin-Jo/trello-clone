import React from 'react';
import styled from 'styled-components';
import CreateBoradButton from '../atom/CreateBoradButton';
import NoTableDnD from '../moduler/NoTableDnD';

const Wapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Main = () => {
  return (
    <Wapper>
      <NoTableDnD />
      <CreateBoradButton />
    </Wapper>
  );
};

export default Main;
