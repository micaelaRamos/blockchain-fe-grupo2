
import React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../../styles/palette';

import Tree from './Tree';

const DetailBlockModal = styled.div`
  position: absolute;
  height: 80%;
  z-index: 3;
  right: 56px;
  left: 56px;
  top: 36px;

  border-radius: 6px;
  background-color: #1D2031;
  border: solid 1px #ffffff61;

  padding: 32px;
`;

const ModalContent = styled.div`
  position: relative;
`;

const CenteredContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0 40px;
`;

const Title = styled.span`
  color: ${colors.white};
  font-size: 20px;
`;

const TransactionsContainer = styled.div`
  width: 100%;
  margin: 16px 0;
`;

const Content = styled.div`
  margin: 20px 0;
`;

const Subtitle = styled.span`
  font-size: 20px;
  color: ${colors.white};
  font-weight: bold;
`;

const Transaction = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TransactionData = styled.div`
  display: flex;
  padding: 4px;

  ${props => props.width && css `
    width: ${props.width};
  `}
`;

const TransactionText = styled.span`
  font-size: 18px;
  color: ${colors.white};

  ${props => props.hash && css`
    text-overflow: ellipsis;
    overflow: hidden;
    color: #3fb950;
  `}
`;

const CloseButton = styled.button`
  color: #baaeff;
  padding: 8px 12px;
  background-color: transparent;
  border: none;
  transition: background-color ease-in 0.1s;
  position: absolute;
  border-radius: 4px;
  top: -37px;
  right: -17px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: rgba(133, 138, 227, 0.4);
  }
`;

const MerkleBlockDetail = ({ block, handleClose }) => {
  const { merkleTree } = block;
  const { dataList, tree } = merkleTree;

  return (
    <DetailBlockModal>
      <ModalContent>
        <CloseButton onClick={() => handleClose()}>Cerrar</CloseButton>
        <CenteredContent>
          <Title>Detalle del bloque <strong>{tree[6]}</strong></Title>
        </CenteredContent>
        <Content>
          <Subtitle>Transacciones del bloque</Subtitle>
        </Content>
        <TransactionsContainer>
          {dataList.map(transaction => (
            <Transaction key={transaction.hash}>
              <TransactionData width="30%"><TransactionText>Timestamp: {transaction.timeStamp}</TransactionText></TransactionData>
              <TransactionData width="15%"><TransactionText>Monto: {transaction.mount}</TransactionText></TransactionData>
              <TransactionData width="55%"><TransactionText hash>{transaction.hash}</TransactionText></TransactionData>
            </Transaction>
          ))}
        </TransactionsContainer>
        <Content>
          <Subtitle>Árbol</Subtitle>
        </Content>
        <Tree tree={tree} />
      </ModalContent>
    </DetailBlockModal>
  );
};


export default MerkleBlockDetail;