
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../styles/palette';

const Container = styled.div`
  background-color: ${colors.background};
  height: 100vh;
  width: 100%;
`;

const Header = styled.div`
  background-color: ${colors.error};
  height: 64px;
  box-shadow: 0px 4px 10px 2px rgb(0 0 0 / 19%);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  height: calc(100% - 64px);
  background-color: #111420;
`;

const CompanyName = styled.h1`
  color: ${colors.white};
`;

const Layout = ({ children }) => (
  <Container>
    <Header>
      <div className="components-container">
        <CompanyName>Blockchain Grupo 2</CompanyName>
      </div>
    </Header>
    <Content>
      {children}
    </Content>
  </Container>
);


export default Layout;