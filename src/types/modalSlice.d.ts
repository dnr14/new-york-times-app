declare interface ModalSliceInit {
  isOpen: boolean;
  status: "open" | "close";
  filter: {
    home: {
      headlineKeyword: StringOrNull;
      selectedDate: StringOrNull;
      selectedCountrys: string[] | null;
    };
    scrap: {
      headlineKeyword: StringOrNull;
      selectedDate: StringOrNull;
      selectedCountrys: string[] | null;
    };
  };
}
