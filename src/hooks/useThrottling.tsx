import { useEffect, useRef } from "react";

type ThrottlingFunc = (callback: () => void, delay?: number) => void;

const useThrottling = () => {
  const throttlingRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    throttlingRef.current = null;
  }, []);

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
