import React, { forwardRef } from "react";
import Message from "../Message";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MdKeyboardArrowRight } from "react-icons/md";

const CheckBoxContaienr = styled.div`
  margin: 8px 0;
  max-width: 460px;
`;
const CheckBoxWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  display: flex;
  cursor: pointer;
`;

const Input = styled.input`
  cursor: pointer;
`;

const Text = styled.span<{ bold: boolean | undefined }>`
  display: block;
  line-height: 1.4;
  word-break: break-all;

  font-size: 14px;
  font-weight: 500;
  color: #333333;

  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
`;

const SubText = styled.span`
  font-size: 12px;
  line-height: 1.4;
  color: #555;
  display: block;
  margin: 6px 0 6px 26px;
`;

const ChildrenWrapper = styled.div`
  padding-left: 22px;
`;

type CheckboxTypeProps = React.HTMLProps<HTMLInputElement> & {
  text: string;
  bold?: boolean;
  description?: boolean;
  children?: React.ReactNode;
  subText?: string;
  checked: boolean;
  errorMessage?: string;
};

const CheckBox = forwardRef<HTMLInputElement, CheckboxTypeProps>(
  (
    {
      text,
      bold,
      description,
      children,
      subText,
      name,
      checked = false,
      onChange,
      errorMessage,
    }: CheckboxTypeProps,
    ref
  ) => {
    return (
      <CheckBoxContaienr>
        <CheckBoxWrapper>
          <Label htmlFor="scales">
            <Input
              ref={ref}
              onChange={onChange}
              type="checkbox"
              name={name}
              checked={checked}
            />
            <Text bold={bold}>{text}</Text>
          </Label>
          {description && <MdKeyboardArrowRight />}
        </CheckBoxWrapper>

        <SubText>{subText}</SubText>
        {errorMessage && <Message message={errorMessage}></Message>}

        <ChildrenWrapper>{children}</ChildrenWrapper>
      </CheckBoxContaienr>
    );
  }
);

export default CheckBox;
