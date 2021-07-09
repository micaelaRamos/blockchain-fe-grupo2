
import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';

import { colors } from '../../styles/palette';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TransactionBlockBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: solid 2px ${colors.success};
  padding: 12px;
  background-color: transparent;

  width: 40%;
  margin-top: 18px;

  color: ${colors.success};
  font-weight: 600;

  + .transaction-arrow{
    margin-right: 18px;
  }
`;

const Description = styled.p`
  line-height: 1.25;
  margin: 4px;
`;

const TransactionBlock = ({ data, merkleOn = false }) => (
  <Container>
    <TransactionBlockBlock>
      <Description>Transacción</Description>
      <Description>Emisor: {data.transmitter}</Description>
      <Description>Receptor: {data.receiver}</Description>
      <Description>Monto: {data.mount}</Description>
    </TransactionBlockBlock>
    <Icon type="arrow" className="transaction-arrow" />
    <TransactionBlockBlock>
     {!merkleOn && <Description>La transacción está esperando a ser confirmada por los mineros, una vez confirmada, entrará a la blockchain</Description>}
     {merkleOn && <Description>La transacción está esperando a ser confirmada por los mineros</Description>}
    </TransactionBlockBlock>
  </Container>
);


export default TransactionBlock;