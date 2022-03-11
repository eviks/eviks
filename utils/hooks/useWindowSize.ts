import { useState, useEffect } from 'react';

interface Demensions {
  width: number | undefined;
  height: number | undefined;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Demensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => {
        return window.removeEventListener('resize', handleResize);
      };
    }
    return () => {};
  }, []);
  return windowSize;
};

export default useWindowSize;
