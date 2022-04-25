import { useRef } from "react";
import useThrottling from "./useThrottling";

const useInfinityScroll: UseInfinityScrollFunc = (page, status, callback) => {
  const observerRef = useRef<IntersectionObserver>();
  const throttling = useThrottling();

  const handleObserver: HandleObserver = (node) => {
    if (node === null) return;
    if (observerRef.current) observerRef.current.disconnect();

    const observerCb: HandleObserverFunc = ([entry], observer) => {
      const { target, isIntersecting } = entry;
      if (isIntersecting && status !== "loading") {
        observer.unobserve(target);
        throttling(() => callback(page), 400);
      }
    };

    /**
     * threshold 관찰요소와 얼만큼 겹쳤을 때 콜백을 수행하도록 지정하는 요소
     */
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    observerRef.current = new IntersectionObserver(observerCb, options);
    observerRef.current.observe(node);
  };

  return handleObserver;
};

export default useInfinityScroll;
