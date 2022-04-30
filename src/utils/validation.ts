export type RegularExpressionErrorType = {
  [key in string]: { isError: true; message: string };
};

export const errorMessages = {
  MAX_LENGTH: "너무 깁니다.",
  NOT_HTML: "HTML은 형식은 포함 될 수 없습니다.",
  SPECIAL_CHAR: "특수 문자는 포함 될 수 없습니다.",
};

export const isHtmlTag = (value: string) => /(<([^>]+)>)/g.test(value);
export const isMaxLength = (value: string, maxLength: number) => {
  return value.length > maxLength;
};
export const isSpecialChracters = (value: string) =>
  /[\\{\\}\\[\]\\/?.,;:|\\)*~`!^\-_+<>@\\#$%&\\\\=\\(\\'\\"]/gi.test(value);

export const isNull = (value: string | null) => {
  return value === null;
};

export class RegularExpressionError extends Error {
  private errors: RegularExpressionErrorType;

  constructor(id: string, message: string) {
    super();
    this.errors = {
      [id]: {
        isError: true,
        message,
      },
    };
  }

  getError() {
    return this.errors;
  }

  static makeError(id: string, message: string) {
    return {
      [id]: {
        isError: true,
        message,
      },
    };
  }
}
