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

declare type Doc = {
  abstract: string;
  document_type: string;
  byline: {
    organization: StringOrNull;
    original: StringOrNull;
    person: Person[];
  };
  headline: {
    content_kicker: StringOrNull;
    kicker: StringOrNull;
    main: StringOrNull;
    name: StringOrNull;
    print_headline: StringOrNull;
    seo: StringOrNull;
    sub: StringOrNull;
  };
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
};

declare type Meta = {
  hits: number;
  offset: number;
  time: number;
};

declare type StatusType = "loading" | "idle" | "success" | "failed";

declare interface HomeSliceInit {
  docs: Doc[];
  meta: Meta;
  page: number;
  status: StatusType;
  isLastPage: boolean;
}

declare interface FetchArticlesThunkPayload {
  page: number;
  beginDate: StringOrNull;
}

declare type CreateFetchArticlesPayloadFunc = (
  page: number,
  beginDate?: StringOrNull
) => FetchArticlesThunkPayload;
