import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const ButtonWrapper = styled.div`
  max-width: 460px;
  & + & {
    margin-top: 8px;
  }
`;

const ButtonStyled = styled.button<{ primary: boolean | undefined }>`
  background-color: #fff;
  color: #0074e9;
  border: 1px solid #ccc;
  box-shadow: inset 0 -1px 0 rgb(0 0 0 / 15%);

  ${({ primary }) =>
    primary &&
    css`
      background-color: #0074e9;
      color: #fff;
      box-shadow: inset 0 -2px 0 rgb(0 0 0 / 38%);
      border: none;
    `}

  padding: 16px 17px;
  font-size: 17px;
  line-height: 20px;
  display: block;
  padding-left: 0;
  padding-right: 0;
  width: 100%;

  outline: none;
  border-radius: 2px;
  text-align: center;
  font-weight: 700;
  cursor: pointer;
`;

type AnchorProps = React.HTMLProps<HTMLAnchorElement> & {
  primary?: boolean;
  href?: "string" | undefined;
  children: string;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ primary = false, href, children, type = "submit" }: AnchorProps, ref) => {
    return href ? (
      <ButtonWrapper>
        <a href={href} ref={ref}>
          <ButtonStyled type="button" primary={primary}>
            {children}
          </ButtonStyled>
        </a>
      </ButtonWrapper>
    ) : (
      <ButtonWrapper>
        <ButtonStyled type={type} primary={primary}>
          {children}
        </ButtonStyled>
      </ButtonWrapper>
    );
  }
);

export default Button;
