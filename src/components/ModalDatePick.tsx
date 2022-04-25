import calendarImg from "../assets/images/modal/Calendar.svg";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { FC, memo } from "react";
import styled, { css } from "styled-components";

const ModalDatePick: FC<ModalDatePickProps> = ({
  placeholder,
  height,
  datePickerValue,
  onChange,
}) => {
  return (
    <ModalDatePickContainer>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDatePicker
          inputFormat={"YYYY.MM.DD"}
          mask={"____.__.__"}
          value={datePickerValue}
          onChange={onChange}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              inputProps={{
                ...params.inputProps,
                placeholder,
              }}
              sx={{ width: "100%" }}
              height={height}
            />
          )}
        />
      </LocalizationProvider>
      <CalendarImg src={calendarImg} alt="calendarImg" />
    </ModalDatePickContainer>
  );
};

const ModalDatePickContainer = styled.div`
  width: 295px;
  position: relative;
`;

const CalendarImg = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  left: 259px;
  top: 14px;
`;

const CustomTextField = styled(TextField)<Pick<ModalDatePickProps, "height">>`
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    cursor: pointer;
    border-radius: 8px;
    & > input {
      ${({ height = "44px" }) =>
        css`
          height: ${height};
        `}
      box-sizing: border-box;
    }
    &.Mui-focused fieldset {
      border-width: 1px;
    }
  }
`;

export default memo(ModalDatePick);
