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
declare type FilterType = keyof ModalSliceInit["filter"];
declare type SetFilterThunkPayload = ModalFilter & { type: FilterType };

declare type Countrys = CountryProps[];
declare type ModalFilter = ModalSliceInit["filter"][FilterType];
declare type HandleHeadLineOnChangeFunc = (
  event: ChangeEvent<HTMLInputElement>
) => void;

declare type HandleDateOnChangeFunc = (value: Date | null) => void;
type CreateSetFilterPayload = (
  filter: ModalFilter,
  type: FilterType
) => SetFilterThunkPayload;
