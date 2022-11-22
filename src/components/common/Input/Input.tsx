import React, { forwardRef } from 'react';
import Message from '../Message';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { IconType } from 'react-icons';

type InputProps = React.HTMLProps<HTMLInputElement> & {
  placeholder?: string;
  icon?: IconType;
  type?: string | undefined;
  errorMessage?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      icon: Icon,
      type = 'text',
      onChange,
      errorMessage,
      name,
    }: InputProps,
    ref
  ) => {
    return (
      <InputWrapper>
        <LabelStyled htmlFor={name} error={errorMessage ? true : false}>
          {Icon && (
            <IconeWrapper>
              <Icon></Icon>
            </IconeWrapper>
          )}
          <InputStyled
            onChange={onChange}
            ref={ref}
            name={name}
            placeholder={placeholder}
            type={type}
          />
        </LabelStyled>
        {errorMessage && <Message message={errorMessage}></Message>}
      </InputWrapper>
    );
  }
);

export default Input;

const InputWrapper = styled.div`
  max-width: 460px;
  & + & {
    margin-top: 8px;
  }
`;

const LabelStyled = styled.label<{ error: boolean }>`
  display: flex;
  border: 1px solid #ccc;

  &:focus-within {
    border-bottom: 2px solid ${({ error }) => (error ? ' #e52528' : '#0074e9')};
  }

  ${({ error }) =>
    error &&
    css`
      border-bottom: 2px solid #e52528;
    `}
`;

const IconeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;

  border-right: 1px solid #ccc;

  & > svg {
    color: #666;
  }
`;

const InputStyled = styled.input`
  border: none;
  background-color: #fff;
  display: block;

  font-size: 14px;
  line-height: 20px;
  color: #111;
  font-weight: 700;
  text-indent: 12px;
  padding: 16px 0 12px;
  width: 100%;
  outline: none;
`;
