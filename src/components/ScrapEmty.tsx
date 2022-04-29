import styled from "styled-components";
import Empty from "./common/Empty";
import { Link } from "react-router-dom";
import { FC, memo } from "react";

const ScrapEmty: FC<Pick<EmptyProps, "text">> = ({ text }) => {
  return (
    <Empty text={text} top="40%">
      <ScrapButton>
        <CustomLink to={"/"}>
          <ScrapText>스크랩 하러 가기</ScrapText>
        </CustomLink>
      </ScrapButton>
    </Empty>
  );
};

const CustomLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ScrapButton = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 60.53%;
  bottom: 0%;
  background: #3478f6;
  border-radius: 16px;
  cursor: pointer;
`;

const ScrapText = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.05em;
  color: #ffffff;
`;

export default memo(ScrapEmty);
