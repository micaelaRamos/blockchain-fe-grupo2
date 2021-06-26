import styled, { css } from 'styled-components'

const Card = styled.div`
  padding: 20px;
  border-radius: 4px;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
  background-color: #1D2031;

  ${props => props.animated && css`
      &:hover {
        cursor: pointer;
        box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
      }
  `}
`;


export default Card;