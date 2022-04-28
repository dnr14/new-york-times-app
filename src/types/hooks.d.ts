/* useInfinityScroll */
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

/* useThrottling */
type ThrottlingFunc = (callback: () => void, delay?: number) => void;
/* useDebounce */
type DebounceFunc = (callback: () => void, delay?: number) => void;
