import React, { forwardRef } from 'react';
import Message from '../Message';
import { MdKeyboardArrowRight } from 'react-icons/md';
import {
  CheckBoxContaienr,
  CheckBoxWrapper,
  Label,
  Input,
  Text,
  SubText,
  ChildrenWrapper,
} from '../CheckBox/CheckBox.style';

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
          <Label htmlFor='scales'>
            <Input
              ref={ref}
              onChange={onChange}
              type='checkbox'
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

CheckBox.displayName = 'CheckBox';

export default CheckBox;
