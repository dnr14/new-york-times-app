declare interface ModalSliceInit {
  isOpen: boolean;
  status: "open" | "close";
  filter: {
    headlineKeyword: StringOrNull;
    selectedDate: StringOrNull;
    selectedCountrys: string[] | null;
  };
}
