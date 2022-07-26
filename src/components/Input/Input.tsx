import React, { forwardRef, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const LabelStyle = styled.label<{ focus: boolean; error: boolean | undefined }>`
  display: block;
  height: 48px;
  padding: 0;
  border: 1px solid #ccc;
  background-color: #fff;
  display: flex;

  ${({ focus }) =>
    focus &&
    css`
      border-bottom: 2px solid #346aff;
    `}

  ${({ error }) =>
    error &&
    css`
      border-bottom: 2px solid #e7223d;
    `}

  margin-top: 14px;
`;

const IconBox = styled.span`
  min-width: 44px;
  height: 100%;
  border-right: 1px solid #ccc;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputStyle = styled.input`
  width: 100%;
  padding: 16px 0 12px;
  border: 0 none;
  font-size: 14px;
  line-height: 20px;
  color: #111;
  font-weight: 700;
  text-indent: 12px;
  border: none;
  outline: none;
`;

type InputType = {
  icon: JSX.Element;
  id: string;
  placeholder?: string;
  error?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputType>((props, ref) => {
  const { icon, id, placeholder, error, onBlur: defaultOnBlur, ...rest } = props;
  const [focus, setFocus] = useState(false);

  const onBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    defaultOnBlur && defaultOnBlur(event);
    setFocus(false);
  };

  return (
    <>
      <LabelStyle htmlFor={id} focus={focus} error={error}>
        <IconBox>{icon}</IconBox>
        <InputStyle
          id={id}
          placeholder={placeholder}
          ref={ref}
          {...rest}
          onFocus={() => setFocus(true)}
          onBlur={onBlur}
        />
      </LabelStyle>
    </>
  );
});

Input.displayName = 'Input';

export default Input;
