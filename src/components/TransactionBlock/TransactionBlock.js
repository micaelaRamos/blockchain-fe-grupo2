
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../styles/palette';

const Container = styled.div`
  display: flex;
`;

const TransactionBlockBlock = styled.div`
  margin-top: 18px;
  border-radius: 4px;
  border: solid 2px ${colors.success};
  background-color: transparent;
  color: ${colors.success};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
  padding: 20px;
  margin-right: 16px;
`;

const TransactionBlock = ({ data }) => (
  <Container>
    <TransactionBlockBlock>
      <span>Tu transacción: {data.hash}</span>
      <p>La transacción está esperando a ser confirmada por los mineros</p>
    </TransactionBlockBlock>
  </Container>
);


export default TransactionBlock;