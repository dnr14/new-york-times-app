import { FC } from "react";
import styled, { css } from "styled-components";
import unionImg from "../../assets/images/empty/Union.svg";
import { createFlexBox, themeColorDeepGray } from "../../assets/styles/theme";

const Empty: FC<EmptyProps> = ({ text, top, children }) => {
  return (
    <EmptyContainer top={top}>
      <TextWrapper>
        <Text>{text}</Text>
        <UnionImg src={unionImg} alt="unionImg" />
      </TextWrapper>
      {children && <ChildrenWrapper>{children}</ChildrenWrapper>}
    </EmptyContainer>
  );
};

const EmptyContainer = styled.div<Pick<EmptyProps, "top">>`
  ${createFlexBox("center", "center", "column")};
  position: absolute;
  width: 295px;
  height: 152px;
  left: 20px;
  gap: 20px;
  ${({ top = "330px" }) => css`
    top: ${top};
  `}
`;

const TextWrapper = styled.div`
  ${createFlexBox("center", "center", "column")};
  width: 174px;
  height: 72px;
  order: 0;
  flex-grow: 0;
  gap: 8px;
`;

const Text = styled.div`
  width: 174px;
  height: 28px;
  font-weight: 600;
  font-size: 13px;
  line-height: 28px;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  color: ${themeColorDeepGray};
  order: 1;
  text-align: center;
`;

const UnionImg = styled.img`
  width: 36px;
  height: 36px;
  order: 0;
`;

const ChildrenWrapper = styled.div`
  width: 295px;
  height: 60px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

export default Empty;
