import { ThemeUtilFunc } from "../../types/styled";
import { css } from "styled-components";

const color = {
  gray: "#c4c4c4",
  black: "#000000",
  blue: "#3478f6",
  white: "#ffffff",
  deepGray: "#6d6d6d",
  red: "#ff0101",
  background: {
    gray1: "rgb(240, 241, 244)",
    gray2: "#fefefe",
    blue: "#82b0f4",
  },
  border: {
    gray: "#f2f2f2",
  },
};

const theme = {
  color,
};

/* color */
const themeColorBlack: ThemeUtilFunc = ({ theme: { color } }) => color.black;
const themeColorGray: ThemeUtilFunc = ({ theme: { color } }) => color.gray;
const themeColorBlue: ThemeUtilFunc = ({ theme: { color } }) => color.blue;
const themeColorWhite: ThemeUtilFunc = ({ theme: { color } }) => color.white;
const themeColorDeepGray: ThemeUtilFunc = ({ theme: { color } }) =>
  color.deepGray;
const themeColorRed: ThemeUtilFunc = ({ theme: { color } }) => color.red;

/* background color */
const themeBackgroundGrayOne: ThemeUtilFunc = ({ theme: { color } }) =>
  color.background.gray1;
const themeBackgroundGrayTwo: ThemeUtilFunc = ({ theme: { color } }) =>
  color.background.gray2;
const themeBackgroundBlue: ThemeUtilFunc = ({ theme: { color } }) =>
  color.background.blue;

/* border color */
const themeBorderGray: ThemeUtilFunc = ({ theme: { color } }) =>
  color.border.gray;

const createFlexBox = (
  justifyContent: string,
  alignItems: string,
  flexDirection?: string
) => css`
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-direction: ${flexDirection ?? "row"};
`;
const createLeftRight = ({ right, left }: ButtonTextProps) => css`
  ${left &&
  css`
    left: ${left};
  `};
  ${right &&
  css`
    right: ${right};
  `};
`;

export type Theme = typeof theme;
export {
  theme,
  themeColorBlack,
  themeColorBlue,
  themeColorDeepGray,
  themeColorGray,
  themeColorWhite,
  themeColorRed,
  themeBackgroundBlue,
  themeBackgroundGrayOne,
  themeBackgroundGrayTwo,
  themeBorderGray,
  createFlexBox,
  createLeftRight,
};
