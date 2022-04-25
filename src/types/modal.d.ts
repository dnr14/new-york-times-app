declare interface ModalStyleProps {
  width?: string;
}
declare interface CountryProps {
  countryName: string;
  width?: string;
}
declare interface ModalInputTitleProps {
  width?: string;
  text: string;
}

declare type Countrys = CountryProps[];
declare type ModalFilter = ModalSliceInit["filter"];
declare type HandleHeadLineOnChangeFunc = (
  event: ChangeEvent<HTMLInputElement>
) => void;

declare type HandleDateOnChangeFunc = (value: Date | null) => void;
