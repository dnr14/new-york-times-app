import { FC, memo } from "react";
import styled, { css } from "styled-components";

const ModalInputTitle: FC<ModalInputTitleProps> = ({ width, text }) => {
  return (
    <ModalInputTitleWrapper width={width}>
      <Title>{text}</Title>
    </ModalInputTitleWrapper>
  );
};

const ModalInputTitleWrapper = styled.div<Pick<ModalStyleProps, "width">>`
  ${({ width }) => css`
    width: ${width ?? "auto"};
  `}
  height: 24px;
`;

const Title = styled.span`
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.05em;
  color: #000000;
`;

export default memo(ModalInputTitle);
