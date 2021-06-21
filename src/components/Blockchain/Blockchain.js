
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../styles/palette';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Block = styled.div`
  width: 120px;
  height: 80px;
  border-radius: 4px;
  background-color: ${colors.violet};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
`;

const Chain = styled.div`
  width: 16px;
  height: 2px;
  background-color: #333;
`;

const Blockchain = () => (
  <Container>
    <Block />
    <Chain />
    <Block />
    <Chain />
    <Block />
    <Chain />
    <Block />
    <Chain />
    <Block />
  </Container>
);


export default Blockchain;