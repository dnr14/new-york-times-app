import { useRef } from "react";
import useThrottling from "./useThrottling";

/**
 * @param page  현재 페이지입니다.
 * @param status 현재 API 상태입니다.
 * @param callback 관찰 대상이 화면과 교차 됬을 때 실행할 콜백을 넘기면 됩니다.
 * @returns 대상 관찰하기 위한 ref함수를 리턴합니다.
 */
const useInfinityScroll: UseInfinityScrollFunc = (page, status, callback) => {
  const observerRef = useRef<IntersectionObserver>();
  const throttling = useThrottling();

  const handleObserver: HandleObserver = (node) => {
    if (node === null) return;
    if (observerRef.current) observerRef.current.disconnect();

    const observerCallback: HandleObserverFunc = ([entry], observer) => {
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
      threshold: 1,
    };
    observerRef.current = new IntersectionObserver(observerCallback, options);
    observerRef.current.observe(node);
  };

  return handleObserver;
};

export default useInfinityScroll;
