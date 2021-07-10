
import React from 'react';
import styled, { css } from 'styled-components';

import Icon from '../Icon';

import { colors } from '../../styles/palette';

const Container = styled.div`
  margin-top: 20px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Block = styled.div`
  position: relative;
  width: 120px;
  border-radius: 4px;
  background-color: #5151CB;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0;
  padding: 8px 8px 16px;
  min-height: 104px;
  transition: bottom ease-in-out 0.2s;

  ${props => props.firstBlock && css `
    background-color: transparent;
    border: solid 2px #55D364;
  `}

  ${props => props.merkleBlock && css `
      width: 200px;

      &:hover {
        cursor: pointer;
        bottom: 8px;
      }
  `}
`;

const Chain = styled.div`
  width: 16px;
  height: 2px;
  background-color: white;
`;

const Transaction = styled.span`
  font-size: 12px;
  color: white;
  margin: 6px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props => props.firstBlock && css `
    color: #55D364;
  `}
`;

const Number = styled.span`
  position: absolute;
  font-size: 12px;
  color: ${colors.success};
  font-weight: 600;
  margin: 6px;
  bottom: 2px;
  right: 4px;
`;

const MessageBox = styled.div`
  width: fit-content;
  padding: 12px;
  background-color: transparent;
  border: solid 2px ${colors.success};
  border-radius: 4px;
`;

const Message = styled.span`
  margin: 4px 0;
  color: ${colors.success};
  line-height: 1.4;
  font-weight: 600;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`;

const Blockchain = ({ chainData, showNewBlockMessage, merkleOn, handleBlockClick }) => {
  if (chainData.length === 0) return null;
  
  const renderBlocks = () => {
    let blocks = chainData.map((block, idx) => {
      if (idx < chainData.length-1) {
        return (
        <>
          <Block firstBlock={idx === 0 } key={`${block.hash || block.prevHash}-block`} merkleBlock={merkleOn} onClick={merkleOn ? () => handleBlockClick(block) : () => {}}>
            <Transaction className="transaction-name">Hash: {block.hash || block.merkleTree.tree[block.merkleTree.tree.length - 1]}</Transaction>
            {block.prevHash && <Transaction className="transaction-name">Prev Hash: {block.prevHash || "0"}</Transaction>}
            <Number>{chainData.length - idx}</Number>
          </Block>
          <Chain key={`${block.hash}-chain`}/>
        </>);
      }

      return (
        <Block firstBlock={idx === 0 } key={`${block.hash || block.prevHash}-block`} merkleBlock={merkleOn} onClick={merkleOn ? () => handleBlockClick(block) : () => {}}>
          <Transaction className="transaction-name">Hash: {block.hash || block.merkleTree.tree[block.merkleTree.tree.length - 1]}</Transaction>
          {block.prevHash && <Transaction className="transaction-name">Prev Hash: {block.prevHash || "0"}</Transaction>}
          <Number>{chainData.length - idx}</Number>
        </Block>
      );
    })

    return blocks;
  };

  return (
    <Container>
    {showNewBlockMessage &&
        <MessageContainer>
          <MessageBox>
            {merkleOn && (
            <Message>
              Se agrega el bloque completo a la cadena
            </Message>
            )}
            {!merkleOn && (
            <Message>
              Se agrega la nueva transacción a un bloque en la cadena
            </Message>
            )}
          </MessageBox>
          <Icon type="arrow" className="new-block-arrow" />
        </MessageContainer>
      }
      <Content>
        {renderBlocks()}
      </Content>
    </Container>
  );
};


export default Blockchain;