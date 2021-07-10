import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import ReactLoading from 'react-loading';

import Layout from './components/Layout';
import Card from './components/Card';
import Blockchain from './components/Blockchain';
import TransactionBlock from './components/TransactionBlock';
import PendingBlock from './components/PendingBlock';

import './styles/App.scss';
import { colors } from './styles/palette';

import BlockchainService from './services/Blockchain';
import MerkleBlockService from './services/MerkleBlock';

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

  ${props => props.merkle && css `
    font-size: 18px;
    font-weight: bold;
  `}
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
  margin-bottom: 32px;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = () => {
  const [receiver, updateReceiver] = useState('');
  const [amount, updateAmount] = useState('');
  const [currency, updateCurrency] = useState('');
  const [enabledInputs, updateEnableInputs] = useState(true);

  const [showPendingBlock, updatePendingBlockVisibility] = useState(false);
  const [chainData, updateChainData] = useState([]);
  const [newBlockMessage, updateNewBlockMessageVisibility] = useState(false);
  const [pendingTransactions, updatePendingTransactions] = useState([]);
  const [transactionData, setTransactionData] = useState({});

  const [merkleOn, switchMerkle] = useState(false);
  const [showMempool, updateMemPoolVisibility] = useState(false);
  const [isLoading, updateLoading] = useState(false);

  let service = BlockchainService;

  useEffect(() => {
    service = merkleOn ? MerkleBlockService : BlockchainService;

    service.getBlocks().then(response => {
      if (response && response.data.length > 0) {
        updateChainData(response.data.reverse());
      }
    });
  }, [merkleOn]);

  const handleMerkleSwitch = () => {
    switchMerkle(prevState => {
      updateChainData([]);
      return !prevState;
    });
  }

  const onSubmit = () => {
    if (receiver === '' && amount === '') {
      return null;
    }
    const data = {
      transmitter: 'user',
      receiver,
      mount: parseFloat(amount, 10),
    };

    updateReceiver('');
    updateAmount('');
    updateCurrency('');
    updateEnableInputs(false);
    updateLoading(true);
    const newTransaction = {
      data: {
        transmitter: "user1",
        receiver: "user2",
        mount: 2500.0,
      },
      hash: "213e95c12428cb59586f1a0f0f6c1d77e1522007b067ca8566d56dbbb5181da4",
      prevHash: "7c82fbbbe56286dabb36d040df1f25594066f8525a879143c7ef4da340b75306",
      timeStamp: 1625855083350,
    };

    // service.createNewTransaction(data).then(response => {
    //   // const newTransaction = response.data;
    //   const newTransaction = response;

      // Muestro que la transacción está siendo validada
      updateMemPoolVisibility(true);
      setTransactionData({ ...newTransaction.data, show: true });

      if (merkleOn) {
        // Oculto que la transacción está siendo validada
        setTimeout(() => {
          setTransactionData({ ...transactionData,  show: false });
        }, 4000);

        // Agrego la transacción al bloque de transacciones pendientes y lo muestro
        setTimeout(() => {
          updatePendingTransactions([ newTransaction, ...pendingTransactions]);
          updatePendingBlockVisibility(true);
        }, 6000);


        // Cuando el bloque está completo, lo agrego a la blockchain
      } else {
        setTimeout(() => {
          // Oculto que la transacción está siendo validada
          setTransactionData({ ...newTransaction.data,  show: false });
          updateMemPoolVisibility(false);

          // Agrego la nueva transacción a la cadena
          updateChainData(prevState => {
            const newItem = { hash: newTransaction.hash, prevHash: newTransaction.prevHash };
            return [newItem, ...prevState];
          });

          // Muestro mensaje en la blockchain
          updateNewBlockMessageVisibility(true);
        }, 4000);

        // Oculto el mensaje de la blockchain
        setTimeout(() => {
          updateNewBlockMessageVisibility(false);
          updateEnableInputs(true);
          updateLoading(false);
        }, 6000);
      }
    // });
  };
  
  return (
    <Layout className="transaction-page">
      <Content size="20%">
        <SwitchContainer>
          <label class="switch">
            <input type="checkbox" checked={merkleOn} onClick={() => handleMerkleSwitch()} />
            <span class="slider round"></span>
          </label>
          <Label merkle>Merkle Tree</Label>
        </SwitchContainer>
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
          <Button onClick={() => onSubmit()} disabled={!enabledInputs}>
            {!isLoading && "ENVIAR"}
            {isLoading && 
              <LoadingContainer>
                <ReactLoading className="login-button__loading" color={colors.white} height="20px" width="20px" />
              </LoadingContainer>
            }
          </Button>
        </Card>
      </Content>
      <Content size="80%" padding="24px 32px 24px 20px">
        <Title>¿Qué sucede por atrás?</Title>
        <Card>
          <Subtitle>Blockchain</Subtitle>
          <Blockchain chainData={chainData} showNewBlockMessage={newBlockMessage} merkleOn={merkleOn} />
          <AuxBlock>
            {(showMempool || showPendingBlock) && <Subtitle>Mempool</Subtitle>}
            {transactionData.show &&
              <TransactionBlock data={transactionData} merkleOn={merkleOn} />
            }
            {showPendingBlock && merkleOn && <PendingBlock transactions={pendingTransactions} merkleOn={merkleOn} />}
          </AuxBlock>
        </Card>
      </Content>
    </Layout>
  );
}

export default Main;
