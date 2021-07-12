import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import ReactLoading from 'react-loading';

import Layout from './components/Layout';
import Card from './components/Card';
import Blockchain from './components/Blockchain';
import TransactionBlock from './components/TransactionBlock';
import PendingBlock from './components/PendingBlock';
import MerkleBlockDetail from './components/MerkleBlockDetail';

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
  const [enabledInputs, updateEnableInputs] = useState(true);

  const [showPendingBlock, updatePendingBlockVisibility] = useState(false);
  const [chainData, updateChainData] = useState([]);
  const [newBlockMessage, updateNewBlockMessageVisibility] = useState(false);
  const [pendingTransactions, updatePendingTransactions] = useState([]);
  const [transactionData, setTransactionData] = useState({});

  const [merkleOn, switchMerkle] = useState(false);
  const [showMempool, updateMemPoolVisibility] = useState(false);
  const [isLoading, updateLoading] = useState(false);

  const [merkleBlock, setMerkleBlock] = useState({});
  const [showMerkleDetail, displayMerkleDetail] = useState(false);

  useEffect(() => {
    const service = merkleOn ? MerkleBlockService : BlockchainService;

    service.getBlocks().then(response => {
      if (response && response.data.length > 0) {
        updateChainData(response.data.reverse());
      }
    });

    if (merkleOn) {
      service.getPendingMerkleTransactions().then(response => {
        if (response.data.length > 0) {
          updatePendingTransactions(response.data);
          updateMemPoolVisibility(true);
          updatePendingBlockVisibility(true);
        }
      })
    } else {
      updateMemPoolVisibility(false);
      updatePendingBlockVisibility(false);
    }
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
      transmitter: 'Usuario Transmisor',
      receiver,
      mount: parseFloat(amount, 10),
    };

    updateReceiver('');
    updateAmount('');
    updateEnableInputs(false);
    updateLoading(true);

    const transactionService = merkleOn ? MerkleBlockService : BlockchainService;

    transactionService.createNewTransaction(data).then(response => {
      const newTransaction = response.data;
      
      updateMemPoolVisibility(true);

      if (merkleOn) {
        setTransactionData({ ...data, show: true });
        // Oculto que la transacción está siendo validada
        setTimeout(() => {
          setTransactionData({ ...data,  show: false });

          // Muestro las transacciones pendientes si hay
          updatePendingTransactions(newTransaction);

          if (!!newTransaction.length) {
            updatePendingBlockVisibility(true);
          } else {
            updatePendingBlockVisibility(false);
            updateMemPoolVisibility(false);
            
            // Si no hay transacciones pendientes, el bloque está completo
            transactionService.getBlocks().then(response => {
                updateChainData(response.data.reverse());
              });

            // Muestro mensaje en la blockchain
            updateNewBlockMessageVisibility(true);
          }
        }, 4000);

        setTimeout(() => {
          updateNewBlockMessageVisibility(false);
          updateEnableInputs(true);
          updateLoading(false);
        }, 8000);
      } else {
        // Muestro que la transacción está siendo validada
        setTransactionData({ ...newTransaction.data, show: true });

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
    });
  };

  const handleBlockClick = (block) => {
    console.log("clickck block");

    displayMerkleDetail(prevState => {
      setMerkleBlock(block);
      return !prevState;
    })
  }

  return (
    <>
    <Layout className="transaction-page">
    {showMerkleDetail && merkleOn && <MerkleBlockDetail block={merkleBlock} handleClose={() => displayMerkleDetail(false)} />}
      <Content size="20%">
        <SwitchContainer>
          <label className="switch">
            <input type="checkbox" checked={merkleOn} onClick={() => handleMerkleSwitch()} />
            <span className="slider round"></span>
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
          <Blockchain
            chainData={chainData}
            showNewBlockMessage={newBlockMessage}
            merkleOn={merkleOn}
            handleBlockClick={handleBlockClick}
          />
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
    </>
  );
}

export default Main;
