import { useEffect, useRef } from 'react';

export const usePageTitle = (title: string, restoreOnUnmount: boolean = true) => {
  const previousTitleRef = useRef(document.title);

  useEffect(() => {
    document.title = title;

    return () => {
      if (restoreOnUnmount) {
        document.title = previousTitleRef.current;
      }
    };
  }, [title, restoreOnUnmount]);
}; 