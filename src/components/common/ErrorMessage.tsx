import { FC, memo } from "react";
import styled from "styled-components";

const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => (
  <ErrorMessageWrapper>{text}</ErrorMessageWrapper>
);

const ErrorMessageWrapper = styled.div`
  position: absolute;
  top: 100px;
  color: #ff0101;
  font-size: 12px;
`;

export default memo(ErrorMessage);
