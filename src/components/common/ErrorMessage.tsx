import { FC, memo } from "react";
import styled from "styled-components";
import { themeColorRed } from "../../assets/styles/theme";

const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => (
  <ErrorMessageWrapper>{text}</ErrorMessageWrapper>
);

const ErrorMessageWrapper = styled.div`
  position: absolute;
  top: 100px;
  font-size: 12px;
  color: ${themeColorRed};
`;

export default memo(ErrorMessage);
