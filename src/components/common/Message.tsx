import React from "react";
import styled from "@emotion/styled";

const InputError = styled.div`
  color: #e52528;
  font-size: 12px;
  line-height: 18px;
  margin: 9px 12px 0;
`;

const Message = ({ message }: { message: string }) => {
  return <InputError>{message}</InputError>;
};

export default Message;
