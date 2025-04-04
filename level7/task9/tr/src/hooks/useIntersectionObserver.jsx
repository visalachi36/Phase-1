import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (callback, options) => {
  const observerRef = useRef(null);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (!target) return;

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    observerRef.current.observe(target);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [target, callback, options]);

  return setTarget;
};

export default useIntersectionObserver;
