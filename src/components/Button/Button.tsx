import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const ButtonStyle = styled.button<{ primary: boolean | undefined }>`
  color: #0074e9;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: inset 0 -2px 0 rgb(0 0 0 / 38%);
  padding: 16px 17px;
  font-size: 17px;
  line-height: 20px;
  cursor: pointer;
  width: 100%;

  ${({ primary }) =>
    primary &&
    css`
      background-color: #0074e9;
      color: #fff;
      border: none;
    `}
`;

interface ButtonType extends React.ComponentPropsWithoutRef<'button'> {
  primary?: boolean;
  children: ReactNode;
}

const Button = (props: ButtonType) => {
  const { primary, children, ...rest } = props;

  return (
    <ButtonStyle primary={primary} {...rest}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
