import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Layout from './components/Layout';
import Card from './components/Card';
import Blockchain from './components/Blockchain';
import Mempool from './components/Mempool';

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
`;

const Title = styled.h2`
  margin: 0 0 20px;
  color: ${colors.textColor};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-right: 16px;
`;

const Label = styled.span`
  color: #808080;
  font-size: 14px;
  margin: 0 0 .42857em .42857em;
`;

const Input = styled.input`
  color: ${colors.textColor};
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

const Main = () => {
  const [receiver, updateReceiver] = useState('');
  const [amount, updateAmount] = useState('');
  const [currency, updateCurrency] = useState('');
  const [enabledInputs, updateEnableInputs] = useState(true);
  const [mempool, updateMempoolData] = useState({ show: false });
  
  const hash = "299bd128c1101fd6";

  const onSubmit = () => {
    if (receiver === '' && amount === '') {
      return null;
    }

    updateReceiver('');
    updateAmount('');
    updateCurrency('');
    updateEnableInputs(false);
    updateMempoolData({show: true, data: { hash } })
  };

  return (
    <Layout className="transaction-page">
      <Content size="30%">
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
          <Button onClick={() => onSubmit()} disabled={!enabledInputs}>ENVIAR</Button>
        </Card>
      </Content>
      <Content size="70%">
        <Title>¿Qué sucede por atrás?</Title>
        <Card>
          <Blockchain />
          {mempool.show && <Mempool data={mempool.data} />}
        </Card>
      </Content>
    </Layout>
  );
}

export default Main;
