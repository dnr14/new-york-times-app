import styled from "styled-components";
import Empty from "./common/Empty";
import { useNavigate } from "react-router-dom";
import { FC, memo } from "react";
import { useAppDispatch } from "../modules/store";
import { setModalType } from "../modules/slices/modalSlice";
import {
  createFlexBox,
  themeColorBlue,
  themeColorWhite,
} from "../assets/styles/theme";

const ScrapEmty: FC<Pick<EmptyProps, "text">> = ({ text }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleOnClick = (path: RoutePath) => () => {
    dispatch(setModalType("home"));
    navigate(path);
  };

  return (
    <Empty text={text} top="40%">
      <ScrapButton>
        <ScrapTextWrapper onClick={handleOnClick("/")}>
          <ScrapText>스크랩 하러 가기</ScrapText>
        </ScrapTextWrapper>
      </ScrapButton>
    </Empty>
  );
};

const ScrapTextWrapper = styled.div`
  ${createFlexBox("center", "center")};
  height: 100%;
`;

const ScrapButton = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 60.53%;
  bottom: 0%;
  background: ${themeColorBlue};
  border-radius: 16px;
  cursor: pointer;
`;

const ScrapText = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.05em;
  color: ${themeColorWhite};
`;

export default memo(ScrapEmty);
