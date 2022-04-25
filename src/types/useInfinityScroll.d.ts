declare type UseInfinityScrollFunc = (
  page: number,
  status: StatusType,
  callback: (page: number) => void
) => HandleObserver;

declare type HandleObserverFunc = (
  [entry]: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => void;

declare type HandleObserver = (node: HTMLDivElement | null) => void;
