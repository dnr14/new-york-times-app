import { useEffect, useRef } from "react";

const useThrottling = () => {
  const throttlingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    throttlingRef.current = null;
  }, []);

  /**
   * @param callback setTimeout 콜백 함수 내부에서 호출할 콜백함수입니다.
   * @param delay 몇초 마다 실행을 할껀지 제어하는 시간입니다. 기본은 1초입니다.
   * @returns void
   */
  const throttling: ThrottlingFunc = (callback, delay = 1000) => {
    if (throttlingRef.current) return;

    throttlingRef.current = setTimeout(() => {
      callback();
      throttlingRef.current = null;
    }, delay);
  };

  return throttling;
};

export default useThrottling;
