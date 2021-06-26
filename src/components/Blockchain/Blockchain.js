
import React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../../styles/palette';

const Container = styled.div`
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
  
  ${props => props.red && css `
    background-color: transparent;
    border: solid 2px #55D364;
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
  ${props => props.red && css `
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

const Blockchain = ({ chainData }) => {
  const renderBlocks = () => {
    let blocks = chainData.map((block, idx) => {
      if (idx < chainData.length-1) {
        return (
        <>
          <Block red={idx === 0 }>
            {block.transactions.map(transaction => <Transaction className="transaction-name">{transaction}</Transaction>)}
            <Number className="number">{block.number}</Number>
          </Block>
          <Chain/>
        </>);
      }

      return (
        <Block red={idx === 0 }>
          {block.transactions.map(transaction => <Transaction className="transaction-name">{transaction}</Transaction>)}
          <Number className="number">{block.number}</Number>
        </Block>
      );
    })

    return blocks;
  };
  return (
    <Container>
      {renderBlocks()}
    </Container>
  );
};


export default Blockchain;