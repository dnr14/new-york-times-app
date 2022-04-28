/* Article */
declare type HandleScrapOnClick = (
  _id: string
) => (event: MouseEvent<HTMLDivElement>) => void;

declare interface ArticleProps extends Partial<Doc> {
  main: StringOrNull;
  firstname: string;
  _id: string;
  handleScrapOnClick: HandleScrapOnClick;
}
/* Modal */
declare interface ModalStyleProps {
  width?: string;
}
declare interface CountryProps {
  countryName: string;
  width?: string;
}
/* ModalInputTitle */
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

/* ModalDatePicker */
declare interface ModalDatePickProps {
  placeholder: string;
  height?: string;
  datePickerValue: Date | null;
  onChange: (value: Date | null) => void;
}

/* Top */
declare interface FilterData {
  className: undefined | string;
  text: string;
  img: string;
}
