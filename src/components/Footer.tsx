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

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HOME_PATH = useMemo<RoutePath>(() => "/", []);
  const SCRAP_PATH = useMemo<RoutePath>(() => "/scrap", []);
  const CLASS_NAME = useMemo(() => "active", []);

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

  const _homeImg = pathname === HOME_PATH ? homeFillImg : homeImg;

  return (
    <FooterContainer>
      <HomeButton onClick={handleClick(HOME_PATH)}>
        <HomeFill src={_homeImg} alt="homeFillImg" />
        <HomeText className={pathname === HOME_PATH ? CLASS_NAME : ""}>
          홈
        </HomeText>
      </HomeButton>
      <SheetButton onClick={handleClick(SCRAP_PATH)}>
        <SheetLine
          src={pathname === SCRAP_PATH ? sheetLineFillImg : sheetLineImg}
          alt="sheetLineImg"
        />
        <SheetText className={pathname === SCRAP_PATH ? CLASS_NAME : ""}>
          스크랩
        </SheetText>
      </SheetButton>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 80px;
  position: absolute;
  width: 375px;
  height: 85px;
  left: 0px;
  top: 727px;
  background: #000000;
  border-radius: 30px;
`;

const SheetButton = styled.div`
  cursor: pointer;
  left: 71.73%;
  right: 21.33%;
  top: 23.53%;
  bottom: 23.53%;
  flex: none;
  order: 1;
  flex-grow: 0;
  height: 45px;
  width: 25px;
`;

const SheetLine = styled.img`
  position: absolute;
  left: 72%;
  right: 21.6%;
  top: 23.53%;
  bottom: 48.24%;
`;

const SheetText = styled.span`
  position: absolute;
  left: 71.13%;
  right: 21.33%;
  top: 62.35%;
  bottom: 23.53%;
  width: 30px;
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: #6d6d6d;
  &.active {
    color: #ffffff;
  }
`;

const HomeButton = styled.div`
  cursor: pointer;
  left: 21.33%;
  right: 72.27%;
  top: 23.53%;
  bottom: 23.53%;
  height: 45px;
  width: 25px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const HomeFill = styled.img`
  position: absolute;
  left: 21.33%;
  right: 72.27%;
  top: 23.53%;
  bottom: 48.24%;
`;

const HomeText = styled.span`
  position: absolute;
  left: 22.97%;
  right: 74.13%;
  top: 62.35%;
  bottom: 23.53%;

  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: #6d6d6d;
  &.active {
    color: #ffffff;
  }
`;

export default Footer;
