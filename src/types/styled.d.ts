import { Theme } from "../assets/styles/theme";

declare module "styled-components" {
  interface DefaultTheme extends Theme {}
}
type ThemeProp = { theme: Theme };
declare type ThemeUtilFunc = ({ theme }: ThemeProp) => string;
