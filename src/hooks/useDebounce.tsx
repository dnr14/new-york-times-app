import { useCallback, useEffect, useRef } from "react";

const useDebounce = () => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    debounceRef.current = null;
  }, []);

  const debounce: DebounceFunc = useCallback((callback, delay = 1000) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, []);

  return debounce;
};

export default useDebounce;
