declare type HandleObserverFunc = (
  [entry]: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => void;

declare type HandleObserver = (node: HTMLAnchorElement) => void;
