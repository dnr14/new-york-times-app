import styled from "styled-components";
import sheetLineImg from "../assets/images/footer/SheetLine.svg";
import sheetLineFillImg from "../assets/images/footer/SheetLineFill.svg";
import homeFillImg from "../assets/images/footer/HomeFill.svg";
import homeImg from "../assets/images/footer/Home.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../modules/slices/scrapSlice";
import { SCROLL_TOP, setYOffset } from "../modules/slices/scrollSlice";
import { setModalType } from "../modules/slices/modalSlice";
import {
  createFlexBox,
  createLeftRight,
  themeColorBlack,
  themeColorDeepGray,
  themeColorWhite,
} from "../assets/styles/theme";

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HOME_PATH = useMemo<RoutePath>(() => "/", []);
  const SCRAP_PATH = useMemo<RoutePath>(() => "/scrap", []);
  const CLASS_NAME = useMemo(() => "active", []);
  const isHomePath = pathname === HOME_PATH;

  const handleClick = useCallback(
    (path: RoutePath) => () => {
      const isHome = path === HOME_PATH;
      dispatch(setYOffset(SCROLL_TOP));

      if (isHome) dispatch(setPage(1));

      dispatch(setModalType(isHome ? "home" : "scrap"));
      navigate(path);
    },
    [dispatch, navigate, HOME_PATH]
  );

  return (
    <FooterContainer>
      <ButtonWrapper
        left="21.33%"
        right="72.27%"
        onClick={handleClick(HOME_PATH)}
      >
        <ButtonImg src={isHomePath ? homeFillImg : homeImg} alt="homeFillImg" />
        <ButtonText className={isHomePath ? CLASS_NAME : ""}>홈</ButtonText>
      </ButtonWrapper>
      <ButtonWrapper
        left="71.73%"
        right="21.33%"
        onClick={handleClick(SCRAP_PATH)}
      >
        <ButtonImg
          src={isHomePath ? sheetLineImg : sheetLineFillImg}
          alt="sheetLineImg"
        />
        <ButtonText className={isHomePath ? "" : CLASS_NAME}>스크랩</ButtonText>
      </ButtonWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: absolute;
  padding: 20px 80px;
  width: 375px;
  height: 85px;
  left: 0px;
  top: 727px;
  border-radius: 30px;
  background: ${themeColorBlack};
  ${createFlexBox("space-between", "center")}
`;

/* 버튼 래퍼 */
const ButtonWrapper = styled.div<ButtonTextProps>`
  cursor: pointer;
  top: 23.53%;
  bottom: 23.53%;
  height: 45px;
  width: 25px;
  ${createFlexBox("center", "")};
  ${createLeftRight};
`;

/* 버튼 이미지 */
const ButtonImg = styled.img<ButtonTextProps>`
  position: absolute;
  top: 23.53%;
  bottom: 48.24%;
  ${createLeftRight}
`;

/* 버튼 텍스트 */
const ButtonText = styled.span<ButtonTextProps>`
  position: absolute;
  top: 62.35%;
  bottom: 23.53%;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
  color: ${themeColorDeepGray};
  ${createLeftRight}
  &.active {
    color: ${themeColorWhite};
  }
`;

export default Footer;
