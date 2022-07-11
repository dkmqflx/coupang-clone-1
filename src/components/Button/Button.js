import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const ButtonStyle = styled.button`
  color: #0074e9;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: inset 0 -2px 0 rgb(0 0 0 / 38%);
  padding: 16px 17px;
  font-size: 17px;
  line-height: 20px;
  cursor: pointer;
  display: block;
  width: 100%;

  ${({ variant }) =>
    variant === 'primary' &&
    css`
      background-color: #0074e9;
      color: #fff;
      border: none;
    `}
`;

function Button(props) {
  const { variant, children, ...rest } = props;

  return (
    <ButtonStyle variant={variant} {...rest}>
      {children}
    </ButtonStyle>
  );
}

export default Button;
