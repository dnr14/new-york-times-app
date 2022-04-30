/* modalSlice */

/*
 * headlineKeyword : 헤드라인 검색어
 * selectedDate : 선택한 날짜
 * selectedCountrys : 선택한 국가
 * selectedCountrysHash : 선택한 국가들에 2번째 문자열의 아스키 코드 합
 */
interface Filter {
  headlineKeyword: StringOrNull;
  selectedDate: StringOrNull;
  selectedCountrys: CountryEnglNameType[] | null;
  selectedCountrysHash: number | null;
}

declare type ModalFilterType = keyof ModalSliceInit["filter"];

declare interface ModalSliceInit {
  isOpen: boolean;
  status: "open" | "close";
  type: ModalFilterType;
  filter: {
    home: Filter;
    scrap: Filter;
  };
}

/* homdSlice */
declare type StringOrNull = string | null;

// 기사를 쓴 기자들 이름입니다.
interface Person {
  firstname: StringOrNull;
  lastname: StringOrNull;
  middlename: StringOrNull;
  organization: StringOrNull;
  qualifier: StringOrNull;
  rank: number | null;
  role: StringOrNull;
  title: StringOrNull;
}

interface Byline {
  organization: StringOrNull;
  original: StringOrNull;
  person: Person[];
}

interface Headline {
  content_kicker: StringOrNull;
  kicker: StringOrNull;
  main: StringOrNull;
  name: StringOrNull;
  print_headline: StringOrNull;
  seo: StringOrNull;
  sub: StringOrNull;
}

interface Keywords {
  name: string;
  value: string;
  rank: number;
  major: string;
}

declare type Doc = {
  abstract: string;
  document_type: string;
  byline: Byline;
  headline: Headline;
  news_desk: string;
  print_page: string;
  print_section: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
  _id: string;
  isScrap: boolean;
  keywords: Keywords[];
};

declare type Meta = {
  hits: number;
  offset: number;
  time: number;
};

declare type StatusType = "loading" | "idle" | "success" | "failed";
declare type ScrapStatus = "remove" | "add" | "idle";

declare type HomeSliceError = {
  isError: boolean;
  message: StringOrNull;
};

declare interface HomeSliceInit {
  docs: Doc[];
  meta: Meta;
  page: number;
  status: StatusType;
  isLastPage: boolean;
  isEmpty: boolean;
  error: HomeSliceError;
  scrapStatus: ScrapStatus;
}

declare interface FetchArticlesThunkPayload {
  page: number;
  beginDate: StringOrNull;
  headlineKeyword: StringOrNull;
  selectedCountrys: CountryEnglNameType[] | null;
}
declare type CreateEndPointFunc = (
  page: number,
  beginDate: StringOrNull,
  headlineKeyword: StringOrNull,
  selectedCountrys: CountryEnglNameType[] | null
) => string;

declare type CreateFetchArticlesPayloadFunc = (
  page: number,
  beginDate?: StringOrNull,
  headlineKeyword?: StringOrNull,
  selectedCountrys?: CountryEnglNameType[] | null
) => FetchArticlesThunkPayload;

/* scrapSlice */
declare interface ScrapSliceInit {
  docs: Doc[];
  page: number;
  status: StatusType;
}
