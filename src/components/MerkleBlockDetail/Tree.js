
import React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../../styles/palette';

const TreeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NodesContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const Node = styled.div`
  max-width: 30%;
  padding: 12px 16px;
  margin: 8px 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 24px;

  ${props => props.leaf && css `
    color: #3fb950;
    font-weight: bold;
    background-color: rgba(63, 185, 80, 0.1);
    border-color: rgba(63, 185, 80, 0.4);
    border: solid 1px;
  `}

  ${props => props.root && css `
    color: ${colors.success};
    font-weight: bold;
    background-color: rgba(151, 223, 252, 0.1);
    border-color: rgba(151, 223, 252, 0.4);
    border: solid 1px;
  `}

  ${props => props.parent && css `
    color: #a1a5e6;
    font-weight: bold;
    background-color: rgba(161, 165, 230, 0.1);
    border-color: rgba(161, 165, 230, 0.4);
    border: solid 1px;
  `}
`;

const Tree = ({ tree }) =>  (
  <TreeContainer>
    <Node root>{tree[0]}</Node>
    <NodesContainer>
      <Node parent>{tree[1]}</Node>
      <Node parent>{tree[2]}</Node>
    </NodesContainer>
    <NodesContainer>
      <Node leaf>{tree[3]}</Node>
      <Node leaf>{tree[4]}</Node>
      <Node leaf>{tree[5]}</Node>
      <Node leaf>{tree[6]}</Node>
    </NodesContainer>
  </TreeContainer>
);


export default Tree;