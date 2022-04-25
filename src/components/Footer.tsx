import styled from "styled-components";
import sheetLineImg from "../assets/images/footer/SheetLine.svg";
import homeFillImg from "../assets/images/footer/HomeFill.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FooterContainer>
      <Link to="/">
        <HomeButton>
          <HomeFill src={homeFillImg} alt="homeFillImg" />
          <HomeText>홈</HomeText>
        </HomeButton>
      </Link>
      <Link to="/scrap">
        <SheetButton>
          <SheetLine src={sheetLineImg} alt="sheetLineImg" />
          <SheetText>스크랩</SheetText>
        </SheetButton>
      </Link>
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
  position: static;
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
`;

const HomeButton = styled.div`
  position: static;
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

  color: #ffffff;
`;

export default Footer;
