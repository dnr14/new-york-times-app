import styled from "styled-components";
import calendarImg from "../assets/images/top/Calendar.svg";
import calendarFillImg from "../assets/images/top/CalendarFill.svg";
import searchImg from "../assets/images/top/Search.svg";
import searchFillImg from "../assets/images/top/SearchFill.svg";
import cellularImg from "../assets/images/top/Cellular.svg";
import wifiImg from "../assets/images/top/Wi-Fi.svg";
import batteryImg from "../assets/images/top/Battery.svg";
import { useAppDispatch, useTypedSelector } from "../modules/store";
import { openCloseModal } from "../modules/slices/modalSlice";
import { useCallback } from "react";
import useThrottling from "../hooks/useThrottling";

const Top = () => {
  const throttling = useThrottling();
  const dispatch = useAppDispatch();
  const filter = useTypedSelector(({ modal }) => modal.filter);

  /**
   * 유저가 빠르게 눌러서 디스패치가 여러번 실행되는걸 방지하기 위해서입니다.
   */
  const handleModalOpen = useCallback(() => {
    throttling(() => dispatch(openCloseModal(true)), 200);
  }, [throttling, dispatch]);

  const dataTransformation = (filter: ModalFilter) => {
    const CLASS_NAME = "selected";

    const headlineKeyword: FilterData = {
      className: undefined,
      text: "전체 헤드라인",
      img: searchImg,
    };
    const selectedDate: FilterData = {
      className: undefined,
      text: "전체 날짜",
      img: calendarImg,
    };

    const selectedCountrys: FilterData = {
      className: undefined,
      text: "전체 국가",
      img: "",
    };

    if (filter.headlineKeyword !== null) {
      headlineKeyword.className = CLASS_NAME;
      headlineKeyword.text = filter.headlineKeyword;
      headlineKeyword.img = searchFillImg;
    }
    if (filter.selectedDate !== null) {
      selectedDate.className = CLASS_NAME;
      selectedDate.text = filter.selectedDate;
      selectedDate.img = calendarFillImg;
    }
    if (filter.selectedCountrys !== null) {
      selectedCountrys.className = CLASS_NAME;
      let text = `${filter.selectedCountrys[0]}`;

      if (filter.selectedCountrys.length > 1)
        text += ` 외 ${filter.selectedCountrys.length - 1}`;
      selectedCountrys.text = text;
    }

    return {
      headlineKeyword,
      selectedDate,
      selectedCountrys,
    };
  };

  const { headlineKeyword, selectedCountrys, selectedDate } =
    dataTransformation(filter["home"]);

  return (
    <header>
      <StatusBarContainer>
        <TimeWrapper>9:41</TimeWrapper>
        <IconWrapper>
          <img src={cellularImg} alt="cellularImg" />
          <img src={wifiImg} alt="wifiImg" />
          <img src={batteryImg} alt="batteryImg" />
        </IconWrapper>
      </StatusBarContainer>
      <FilterContainer>
        <FilterGroup>
          <CategorysWrppaer onClick={handleModalOpen}>
            <HeadLineFilterWrapper className={headlineKeyword.className}>
              <SearchImg src={headlineKeyword.img} alt="searchImg" />
              <HeadLineText>{headlineKeyword.text}</HeadLineText>
            </HeadLineFilterWrapper>
            <DateFilterWrapper className={selectedDate.className}>
              <CalendarImg src={selectedDate.img} alt="calendarImg" />
              <DateText>{selectedDate.text}</DateText>
            </DateFilterWrapper>
            <CountrysFilterWrapper className={selectedCountrys.className}>
              <CountryText>{selectedCountrys.text}</CountryText>
            </CountrysFilterWrapper>
          </CategorysWrppaer>
        </FilterGroup>
      </FilterContainer>
      <UnderLine />
    </header>
  );
};

const UnderLine = styled.div`
  position: absolute;
  width: 375px;
  height: 1px;
  top: 104px;
  background: #c4c4c4;
`;

const StatusBarContainer = styled.div`
  position: absolute;
  height: 44px;
  left: 0px;
  right: 0px;
  top: 0px;
  background: rgba(255, 255, 255, 1);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const TimeWrapper = styled.span`
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

const IconWrapper = styled.div`
  position: absolute;
  left: 293.5px;
  top: 17.16px;
  width: 67px;
  height: 11.5px;
  display: flex;
  gap: 5px;
`;

const FilterContainer = styled.nav`
  position: absolute;
  width: 375px;
  height: 60px;
  top: 44px;
  background: rgba(255, 255, 255, 1);
`;

const FilterGroup = styled.div`
  position: absolute;
  width: 355px;
  height: 34px;
  left: 20px;
  top: 13px;
  font-size: 12px;
  & .selected {
    border-color: #3478f6;
    & span {
      color: #3478f6;
    }
  }
`;

const CategorysWrppaer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 34px;
  gap: 7px;
`;
/* 헤드 라인 */
const HeadLineFilterWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 12px;
  gap: 4px;
  width: 117px;
  height: 34px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 30px;
  order: 1;
`;

/* 헤드라인 아이콘 */
const SearchImg = styled.img`
  width: 16px;
  height: 16px;
  left: 12px;
`;
/* 헤드라인 텍스트 */
const HeadLineText = styled.span`
  width: 73px;
  height: 24px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.04em;
  color: #6d6d6d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/* 전체 날짜 */
const DateFilterWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 12px;
  gap: 4px;
  min-width: 94px;
  height: 34px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 30px;
  order: 2;
`;

/* 전체 날짜 아이콘*/
const CalendarImg = styled.img`
  width: 16px;
  height: 16px;
`;

/* 전체 날짜 텍스트 */
const DateText = styled.span`
  min-width: 50px;
  height: 24px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.04em;
  color: #6d6d6d;
`;

/* 전체 국가 */
const CountrysFilterWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 12px;
  height: 34px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 30px;
  order: 3;
`;
/* 전체 국가 텍스트 */
const CountryText = styled.span`
  height: 24px;
  max-width: 90px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.04em;
  color: #6d6d6d;
  flex: none;
  order: 0;
  flex-grow: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Top;
