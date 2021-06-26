import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Layout from './components/Layout';
import Card from './components/Card';
import Blockchain from './components/Blockchain';
import TransactionBlock from './components/TransactionBlock';
import PendingBlock from './components/PendingBlock';

import './styles/App.scss';
import { colors } from './styles/palette';

const Content = styled.div`
  padding: 24px 8%;

  ${props => props.size && css `
    width: ${props.size};
  `}

  ${props => props.bgColor && css `
    background-color: ${props.bgColor};
  `}

  ${props => props.padding && css `
    padding: ${props.padding};
  `}
`;

const Title = styled.h2`
  margin: 0 0 20px;
  color: #c9d1d9;
`;

const Subtitle = styled.span`
  font-size: 18px;
  color: #c9d1d9;
  font-weight: 600;
`;


const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-right: 16px;
`;

const Label = styled.span`
  color: #ACACAC;
  font-size: 14px;
  margin: 0 0 .42857em .42857em;
`;

const Input = styled.input`
  background-color: transparent;
  color: #c9d1d9;
`;

const Button = styled.button`
  background: ${colors.primary};
  border-radius: 3px;
  padding: 8px 10px;
  border: none;
  font-size: 14px;
  margin: 0 4px;
  color: white;
  font-weight: 600;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);

  &:hover {
    cursor: pointer;
  }
`;

const AuxBlock = styled.div`
  margin-top: 32px;
`;

const SwitchContainer = styled.div`
  
`;

const aux = [{
    transactions: ['19283y12938kjdsn','19283y12938kjdsn','19283y12938kjdsn','19283y12938kjdsn'],
    number: 4,
  }, {
    transactions: ['19283y12938kjdsn','19283y12938kjdsn','19283y12938kjdsn','19283y12938kjdsn'],
    number: 3,
  }, {
    transactions: ['19283y12938kjdsn','19283y12938kjdsn','19283y12938kjdsn','19283y12938kjdsn'],
    number: 2,
  }, {
    transactions: ['19283y12938kjdsn','19283y12938kjdsn','19283y12938kjdsn','19283y12938kjdsn'],
    number: 1,
}];

const Main = () => {
  const [receiver, updateReceiver] = useState('');
  const [amount, updateAmount] = useState('');
  const [currency, updateCurrency] = useState('');
  const [enabledInputs, updateEnableInputs] = useState(true);
  const [mempool, updateTransactionBlockData] = useState({ show: false });
  const [showPendingBlock, updatePendingBlockVisibility] = useState(false);
  const [chainData, updateChainData] = useState(aux);
  const [newBlockMessage, updateNewBlockMessageVisibility] = useState(false);

  const [pendingTransactions, updatePendingTransactions] = useState([]);
  const [merkleOn, switchMerkle] = useState(false);
  
  const hash = "299bd128c1101fd6";

  const onSubmit = () => {
    if (receiver === '' && amount === '') {
      return null;
    }

    updateReceiver('');
    updateAmount('');
    updateCurrency('');
    updateEnableInputs(false);

    if (pendingTransactions.length === 0) {
      updateTransactionBlockData({show: true, data: { hash } });
      updatePendingTransactions([hash, ...pendingTransactions]);

      setTimeout(() => {
        updateTransactionBlockData({ show: false });
        updatePendingBlockVisibility(true);
        updateEnableInputs(true);
      }, 4000);
    } else {
      updatePendingTransactions(prevState => {
        const newArray = [hash, ...prevState];

        if(newArray.length === 4) {
          updateChainData([{ transactions: newArray, number: (chainData[0]?.number + 1 || 1) }, ...chainData]);
          updateNewBlockMessageVisibility(true);

          setTimeout(() => {
            updatePendingBlockVisibility(false);
          }, 1500);

          setTimeout(() => {
            updateNewBlockMessageVisibility(false);
          }, 4000);
        }

        return newArray;
      });
      updateEnableInputs(true);
    }
  };
  console.log(merkleOn);
  return (
    <Layout className="transaction-page">
      <Content size="20%">
        <Title>Realizar transferencia</Title>
        <Card className="form-card">
          <InputContainer>
            <Label>Destinatario</Label>
            <Input
              className="text-input"
              id="receiverInput"
              type="text"
              value={receiver}
              onChange={(e) => updateReceiver(e.currentTarget.value)}
              disabled={!enabledInputs}
            />
          </InputContainer>
          <InputContainer>
            <Label>Monto</Label>
            <Input
              className="text-input"
              id="valueInput"
              type="text"
              value={amount}
              onChange={(e) => updateAmount(e.currentTarget.value)}
              disabled={!enabledInputs}
            />
          </InputContainer>
          <InputContainer>
            <Label>Tipo de moneda</Label>
            <Input
              className="text-input"
              id="currencyInput"
              type="text"
              value={currency}
              onChange={(e) => updateCurrency(e.currentTarget.value)}
              disabled={!enabledInputs}
            />
          </InputContainer>
          <SwitchContainer>
            <label class="switch">
              <input type="checkbox" checked={merkleOn} onClick={() => switchMerkle(!merkleOn)} />
              <span class="slider round"></span>
            </label>
            <Label>Merkle Tree</Label>
          </SwitchContainer>
          <Button onClick={() => onSubmit()} disabled={!enabledInputs}>ENVIAR</Button>
        </Card>
      </Content>
      <Content size="80%" padding="24px 32px 24px 20px">
        <Title>¿Qué sucede por atrás?</Title>
        <Card>
          <Subtitle>Blockchain</Subtitle>
          <Blockchain chainData={chainData} showNewBlockMessage={newBlockMessage} merkleOn />
          <AuxBlock>
            {(mempool.show || showPendingBlock) && <Subtitle>Mempool</Subtitle>}
            {mempool.show &&
              <TransactionBlock data={{ hash }} merkleOn />
            }
            {showPendingBlock && <PendingBlock transactions={pendingTransactions} merkleOn />}
          </AuxBlock>
        </Card>
      </Content>
    </Layout>
  );
}

export default Main;
