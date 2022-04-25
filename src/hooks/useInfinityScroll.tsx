import { AsyncThunk } from "@reduxjs/toolkit";
import { useRef } from "react";
import { useAppDispatch } from "../modules/store";

type UseInfinityScrollFunc = (
  page: number,
  status: StatusType,
  asyncThunk: AsyncThunk<HomeResponse, number, any>
) => HandleObserver;

const useInfinityScroll: UseInfinityScrollFunc = (page, status, asyncThunk) => {
  const dispatch = useAppDispatch();
  const observerRef = useRef<IntersectionObserver>();

  const handleObserver: HandleObserver = (node) => {
    if (node === null) return;
    if (observerRef.current) observerRef.current.disconnect();

    const observerCb: HandleObserverFunc = ([entry], observer) => {
      const { target, isIntersecting } = entry;
      if (isIntersecting && status !== "loading") {
        observer.unobserve(target);
        dispatch(asyncThunk(page + 1));
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
