import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CheckBoxGroupWrapper = styled.div`
  margin: 18px 0;
`;

export const CheckBoxTermsWrapper = styled.div`
  padding: 14px;
  border: 1px solid #ccc;
`;

export const CheckBoxContaienr = styled.div`
  margin: 8px 0;
  max-width: 460px;
`;

export const CheckBoxWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.label`
  display: flex;
  cursor: pointer;
`;

export const Input = styled.input`
  cursor: pointer;
`;

export const Text = styled.span<{ bold: boolean | undefined }>`
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

export const SubText = styled.span`
  font-size: 12px;
  line-height: 1.4;
  color: #555;
  display: block;
  margin: 6px 0 6px 26px;
`;

export const ChildrenWrapper = styled.div`
  padding-left: 22px;
`;
