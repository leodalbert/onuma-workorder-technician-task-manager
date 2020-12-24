import { useEffect, useRef } from 'react';

export default (callback, time) => {
  const callbackRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const interval = setInterval(() => callbackRef.current(), time);
    return () => clearInterval(interval);
  }, [time]);
};
