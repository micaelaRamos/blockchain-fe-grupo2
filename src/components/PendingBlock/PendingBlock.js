import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';

import { colors } from '../../styles/palette';

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 12px;
  margin-top: 32px;
  background-color: transparent;
  border: solid 2px ${colors.success};
  border-radius: 4px;
`;

const Transaction = styled.span`
  margin: 4px 0;
  color: ${colors.success};
  line-height: 1.4;
  font-weight: 600;
  overflow: auto;
  text-overflow: ellipsis;
`;

const TransactionBlock = ({ transactions }) => (
  <Content>
    <Container>
      <Transaction>
        Este bloque contiene una serie de transacciones válidas y un espacio a completar. Cuando esté completo, pasará a la Blockchain.
      </Transaction>
    </Container>
    <Icon type="arrow" className="pending-transactions-arrow" />
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
  </Content>
);


export default TransactionBlock;