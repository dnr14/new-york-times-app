import styled from "styled-components";
import calendarCheck from "../assets/images/top/Calendar-check.svg";
import search from "../assets/images/top/Search.svg";
import cellular from "../assets/images/top/Cellular.svg";
import wifi from "../assets/images/top/Wi-Fi.svg";
import battery from "../assets/images/top/Battery.svg";
import { useAppDispatch } from "../modules/store";
import { modalOpen } from "../modules/slices/modalSlice";

// 연속 클릭 시 방지를 위해 디바운스 구현하자.
const Top = () => {
  const dispatch = useAppDispatch();
  const handleModalOpen = () => {
    dispatch(modalOpen());
  };

  return (
    <>
      <StatusBar>
        <Time>9:41</Time>
        <Symbol>
          <img src={cellular} alt="cellular" />
          <img src={wifi} alt="wifi" />
          <img src={battery} alt="battery" />
        </Symbol>
      </StatusBar>
      <Container>
        <FillterGroup>
          <Category onClick={handleModalOpen}>
            <HeadLineFilterWrapper>
              <SearchImg src={search} alt="search" />
              <HeadLineText>전체 헤드라인</HeadLineText>
            </HeadLineFilterWrapper>
            <DateFilterWrapper>
              <CalendarCheckImg src={calendarCheck} alt="calendarCheck" />
              <DateText>전체 날짜</DateText>
            </DateFilterWrapper>
            <CountryFilterWrapper>
              <CountryText>전체 국가</CountryText>
            </CountryFilterWrapper>
          </Category>
        </FillterGroup>
      </Container>
      <Area />
    </>
  );
};

const Area = styled.div`
  position: absolute;
  width: 375px;
  height: 1px;
  left: 0px;
  top: 104px;
  background: #c4c4c4;
`;

const StatusBar = styled.header`
  position: absolute;
  height: 44px;
  left: 0px;
  right: 0px;
  top: 0px;
  background: rgba(255, 255, 255, 1);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const Time = styled.span`
  position: absolute;
  width: 32px;
  height: 18px;
  left: 29.5px;
  top: calc(50% - 18px / 2 + 1px);

  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;

  letter-spacing: -0.165px;

  color: #000000;
`;

const Symbol = styled.div`
  position: absolute;
  width: 67px;
  height: 11.5px;
  left: 293.5px;
  top: 17.16px;
  display: flex;
  gap: 3px;
`;

const Container = styled.nav`
  position: absolute;
  width: 375px;
  height: 60px;
  left: 0px;
  top: 44px;
  background: rgba(255, 255, 255, 1);
`;

const FillterGroup = styled.nav`
  position: absolute;
  width: 355px;
  height: 34px;
  left: 20px;
  top: 13px;
  font-size: 12px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  position: absolute;
  height: 34px;
  left: 0px;
  top: 0px;
`;

const HeadLineFilterWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 12px 4px;

  position: static;
  width: 117px;
  height: 34px;
  left: 0px;
  top: 0px;

  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 30px;

  flex: none;
  order: 2;
  flex-grow: 0;
`;

const SearchImg = styled.img`
  position: static;
  width: 16px;
  height: 16px;
  left: 12px;
  top: 10px;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 4px;
`;

const HeadLineText = styled.span`
  position: static;
  width: 73px;
  height: 24px;
  left: 32px;
  top: 6px;

  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  text-align: right;
  letter-spacing: -0.04em;

  color: #6d6d6d;

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 4px;
`;

const DateFilterWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 12px 4px;

  position: static;
  width: 94px;
  height: 34px;
  left: 124px;
  top: 0px;

  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 30px;

  flex: none;
  order: 3;
  flex-grow: 0;
  margin: 0px 7px;
`;

const DateText = styled.span`
  /* 전체 날짜 */

  position: static;
  width: 50px;
  height: 24px;
  left: 32px;
  top: 6px;

  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  /* identical to box height, or 171% */

  text-align: right;
  letter-spacing: -0.04em;

  /* Black 80 */

  color: #6d6d6d;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 4px;
`;

const CalendarCheckImg = styled.img`
  position: static;
  width: 16px;
  height: 16px;
  left: 22px;
  top: 10px;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 4px;
`;

const CountryFilterWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px 12px 4px;

  position: static;
  width: 74px;
  height: 34px;
  left: 225px;
  top: 0px;

  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 30px;

  flex: none;
  order: 4;
  flex-grow: 0;
`;

const CountryText = styled.span`
  position: static;
  width: 50px;
  height: 24px;
  left: 12px;
  top: 6px;

  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  /* identical to box height, or 171% */

  text-align: right;
  letter-spacing: -0.04em;

  /* Black 80 */

  color: #6d6d6d;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
`;

export default Top;
