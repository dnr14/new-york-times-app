import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import {
  createSetFilterPayload,
  setFilter,
} from "../modules/slices/modalSlice";
import { useAppDispatch, useTypedSelector } from "../modules/store";
import ModalInputTitle from "./ModalInputTitle";
import ModalDatePick from "./ModalDatePick";
import moment from "moment";
import {
  errorMessages,
  isHtmlTag,
  isMaxLength,
  isSpecialChracters,
  RegularExpressionError,
  RegularExpressionErrorType,
} from "../utils/validation";
import ErrorMessage from "./common/ErrorMessage";
import {
  createFlexBox,
  themeBackgroundBlue,
  themeBorderGray,
  themeColorBlue,
  themeColorDeepGray,
  themeColorWhite,
} from "../assets/styles/theme";

/***
 * 해야될 일
 * 공통 부분 빼기
 * 모달 온 오프 되는지 테스트
 */
const Modal = () => {
  const [headLineKeyword, setHeadLineKeyword] = useState("");
  const [errors, setErrors] = useState<RegularExpressionErrorType>();
  const [selectedCountrys, setSelectedCountrys] = useState<
    Set<CountryEnglNameType>
  >(new Set());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { type } = useTypedSelector(({ modal }) => modal);
  const filter = useTypedSelector(({ modal }) => modal.filter);
  const dispatch = useAppDispatch();

  const countrys: [Countrys, Countrys] = useMemo(
    () => [
      [
        {
          countryName: "대한민국",
          countryEnglName: "south korea",
          width: "72px",
        },
        {
          countryName: "중국",
          countryEnglName: "china",
        },
        {
          countryName: "일본",
          countryEnglName: "japan",
        },
        {
          countryName: "미국",
          countryEnglName: "usa",
        },
        {
          countryName: "북한",
          countryEnglName: "north korea",
        },
      ],
      [
        {
          countryName: "러시아",
          countryEnglName: "russia",
          width: "60px",
        },
        {
          countryName: "프랑스",
          countryEnglName: "france",
          width: "60px",
        },
        {
          countryName: "영국",
          countryEnglName: "united kingdom",
        },
      ],
    ],
    []
  );

  /**
   * 1. 현재 상태값을 스토어에 저장하기
   * 2. 모달 상태 값을 변경 후 닫기
   */
  const handleFilterSubmit = () => {
    function createHash(countrys: Set<CountryEnglNameType>) {
      if (countrys.size === 0) return null;
      return Array.from(countrys).reduce(
        (acc, cur) => acc + cur.charCodeAt(0) + cur.charCodeAt(1),
        0
      );
    }

    const filter: ModalFilter = {
      headlineKeyword: null,
      selectedCountrys: null,
      selectedDate: null,
      selectedCountrysHash: createHash(selectedCountrys),
    };

    if (selectedDate !== null) {
      filter.selectedDate = moment(selectedDate).format("YYYY.MM.DD");
    }
    if (headLineKeyword !== "") {
      filter.headlineKeyword = headLineKeyword;
    }
    if (selectedCountrys.size !== 0) {
      filter.selectedCountrys = Array.from(selectedCountrys);
    }
    dispatch(setFilter(createSetFilterPayload(filter, type)));
  };

  /**
   * 헤드라인 키워드 유효성 검사
   * HTML태그 형태로 들어오는지 체크합니다.
   * 최대 100자로 제한합니다.
   * 특수문자가 포함 되었는지 체크합니다.
   */
  const handleHeadLineValidation = (value: string) => {
    const HEAD_LINE_KEYWORD_MAX_LENGTH = 100;
    const HEAD_LINE_ID = "headline";

    try {
      if (isHtmlTag(value)) {
        throw new RegularExpressionError(HEAD_LINE_ID, errorMessages.NOT_HTML);
      }
      if (isMaxLength(value, HEAD_LINE_KEYWORD_MAX_LENGTH)) {
        throw new RegularExpressionError(
          HEAD_LINE_ID,
          `${errorMessages.MAX_LENGTH} 최대 ${HEAD_LINE_KEYWORD_MAX_LENGTH} 입니다.`
        );
      }
      if (isSpecialChracters(value)) {
        throw new RegularExpressionError(
          HEAD_LINE_ID,
          `${errorMessages.SPECIAL_CHAR}`
        );
      }

      return true;
    } catch (error) {
      if (error instanceof RegularExpressionError) setErrors(error.getError());
      return false;
    }
  };

  /**
   * 헤드라인 입력 받으면 실시간으로 값을 동기화 시킵니다.
   */
  const handleHeadLineOnChange: HandleHeadLineOnChangeFunc = useCallback(
    ({ target: { value } }) => {
      setErrors({});
      setHeadLineKeyword((prevHeadLineKeyword) =>
        handleHeadLineValidation(value) ? value : prevHeadLineKeyword
      );
    },
    []
  );

  /*
   * 전체 날짜 선택 함수
   * 날짜 선택 시 클릭 한 날짜로 선택됩니다.
   * 오늘 날짜보다 미래는 선택하지 못합니다. 이상 날짜 클릭 시 초기화가 됩니다.
   */
  const handleDateOnChange: HandleDateOnChangeFunc = useCallback((newValue) => {
    if (moment().valueOf() > moment(newValue).valueOf()) {
      setSelectedDate(newValue);
    } else {
      setSelectedDate(null);
    }
  }, []);

  /*
   * 전체 국가 선택 함수
   * 전체 국가 선택 시 있다면 삭제
   * 없다면 추가합니다.
   */
  const handleCountryOnClick = useCallback(
    (countryEnglName: CountryEnglNameType) => () => {
      setSelectedCountrys((prevCountrys) => {
        if (prevCountrys.has(countryEnglName)) {
          prevCountrys.delete(countryEnglName);
        } else {
          prevCountrys.add(countryEnglName);
        }
        return new Set(prevCountrys);
      });
    },
    []
  );

  const countryEls = useMemo(
    () =>
      countrys.map((row, row_idx, { length }) => {
        const width = row_idx === length - 1 ? "184px" : undefined;

        return (
          <ModalCountrysWrapper key={row_idx} width={width}>
            {row.map(({ countryName, width, countryEnglName }, col_idx) => {
              const className = selectedCountrys.has(countryEnglName)
                ? "selected"
                : undefined;

              return (
                <CountryWrapper
                  key={col_idx}
                  width={width}
                  onClick={handleCountryOnClick(countryEnglName)}
                  className={className}
                >
                  <Country className={className}>{countryName}</Country>
                </CountryWrapper>
              );
            })}
          </ModalCountrysWrapper>
        );
      }),
    [countrys, selectedCountrys, handleCountryOnClick]
  );

  useEffect(() => {
    const { headlineKeyword, selectedDate, selectedCountrys } = filter[type];

    if (headlineKeyword !== null) {
      setHeadLineKeyword(headlineKeyword);
    }
    if (selectedDate !== null) {
      setSelectedDate(new Date(selectedDate));
    }
    if (selectedCountrys !== null) {
      setSelectedCountrys(new Set(selectedCountrys));
    }
  }, [filter, type]);

  return (
    <>
      <ModalBackdrop />
      <ModalContainer>
        <InputContainer>
          <ModalInputTitle width="65px" text="헤드라인" />
          <ModalInput
            placeholder="검색하실 헤드라인을 입력해주세요."
            value={headLineKeyword}
            onChange={handleHeadLineOnChange}
          />
          {errors?.headline?.isError && (
            <ErrorMessage text={errors?.headline?.message} />
          )}
        </InputContainer>
        <InputContainer>
          <ModalInputTitle width="35px" text="날짜" />
          <ModalDatePick
            placeholder="날짜를 선택해주세요."
            datePickerValue={selectedDate}
            onChange={handleDateOnChange}
          />
        </InputContainer>
        <InputContainer>
          <ModalInputTitle width="32px" text="국가" />
          <ModalCountrysContainer>{countryEls}</ModalCountrysContainer>
        </InputContainer>
        <ModalSubmitButton onClick={handleFilterSubmit}>
          <SubmitText>필터 적용하기</SubmitText>
        </ModalSubmitButton>
      </ModalContainer>
    </>
  );
};

const ModalBackdrop = styled.div`
  position: absolute;
  width: 375px;
  height: 812px;
  left: 0px;
  top: 0px;
  background: #000000;
  opacity: 0.5;
`;

const ModalContainer = styled.div`
  padding: 20px;
  position: absolute;
  width: 335px;
  height: 480px;
  left: 20px;
  top: 166px;
  background: #ffffff;
  border-radius: 16px;
  ${createFlexBox("", "flex-start", "column")};
  gap: 40px;
`;

const InputContainer = styled.div`
  ${createFlexBox("", "flex-start", "column")};
  width: 295px;
  gap: 8px;
`;

const ModalInput = styled.input`
  ${createFlexBox("space-between", "center")};
  padding: 10px 20px;
  width: 295px;
  height: 44px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 8px;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.04em;
    color: #c4c4c4;
  }
`;

const ModalCountrysContainer = styled.div`
  ${createFlexBox("", "flex-start", "column")};
  width: 295px;
  height: 76px;
  gap: 8px;
`;

const ModalCountrysWrapper = styled.div<Pick<ModalStyleProps, "width">>`
  ${createFlexBox("", "flex-start")};
  height: 34px;
  gap: 8px;
  ${({ width }) => css`
    width: ${width ?? "auto"};
  `}
`;

const CountryWrapper = styled.div<Pick<ModalStyleProps, "width">>`
  padding: 6px 12px 4px;
  height: 34px;
  box-sizing: border-box;
  border-radius: 30px;
  cursor: pointer;
  ${createFlexBox("center", "center")};
  border: 1px solid ${themeBorderGray};
  ${({ width }) => css`
    width: ${width ?? "48px"};
  `}
  &.selected {
    background-color: ${themeBackgroundBlue};
    border: 1px solid ${themeBorderGray};
  }
`;

const Country = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 24px;
  height: 24px;
  text-align: center;
  letter-spacing: -0.04em;
  color: ${themeColorDeepGray};
  width: 100%;
  &.selected {
    color: ${themeColorWhite};
  }
`;

const ModalSubmitButton = styled.div`
  width: 295px;
  height: 60px;
  background: ${themeColorBlue};
  border-radius: 16px;
  cursor: pointer;
`;

const SubmitText = styled.div`
  position: absolute;
  left: 26.88%;
  right: 26.33%;
  top: 87.08%;
  bottom: 7.92%;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.05em;
  color: ${themeColorWhite};
`;

export default Modal;
