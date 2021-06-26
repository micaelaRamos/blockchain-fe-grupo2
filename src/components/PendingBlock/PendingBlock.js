import React from 'react';
import styled from 'styled-components';

import { colors } from '../../styles/palette';

const Container = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  padding: 12px;
  margin-top: 32px;
  background-color: ${colors.primaryHover};
`;

const Transaction = styled.span`
  margin: 4px 0;
`;

const TransactionBlock = ({ transactions }) => (
  <Container>
    <Transaction>
      b31d032cfdcf47a399990a71e43c5d1a
    </Transaction>
    <Transaction>
      b31d032cfdcf47a399990a41e43c5d1a
    </Transaction>
    <Transaction>
      b31d032cfdcf45a399990a71e43c5d1a
    </Transaction>
    <Transaction>
      b31d032cfdcf27a399990a71e43c5d1a
    </Transaction>
    <Transaction>
      b31d032cfdcf67a399990a71e43c5d1a
    </Transaction>
    <Transaction>
      b31d032cfdcf48a399990a71e43c5d1a
    </Transaction>
  </Container>
);


export default TransactionBlock;