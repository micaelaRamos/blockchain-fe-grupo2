
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../styles/palette';

const Container = styled.div`
  margin-top: 32px;
`;

const Title = styled.span`
  font-size: 18px;
  color: ${colors.textColor};
  font-weight: 600;
`;

const BlocksContainer = styled.div`
  display: flex;
`;

const MempoolBlock = styled.div`
  margin-top: 18px;
  border-radius: 4px;
  background-color: ${colors.success};
  color: ${colors.textColor};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
  padding: 20px;
  margin-right: 16px;
`;

const PrevBlock = styled.div `
  margin-top: 18px;
  border-radius: 4px;
  background-color: ${colors.error};
  color: ${colors.white};
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
  padding: 20px;
`;

const Transaction = styled.span`
  margin: 4px 0;
`;

const Mempool = ({ data }) => (
  <Container>
    <Title>Mempool</Title>
    <BlocksContainer>
      <MempoolBlock>
        Tu transacción: {data.hash}
      </MempoolBlock>
      <PrevBlock>
        <Transaction>Transacciones</Transaction>
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
      </PrevBlock>
    </BlocksContainer>
  </Container>
);


export default Mempool;