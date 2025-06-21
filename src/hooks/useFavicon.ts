import { useEffect } from 'react';

export const useFavicon = (faviconPath: string) => {
  useEffect(() => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (!favicon) {
      return;
    }

    const originalHref = favicon.getAttribute('href') || '/favicon.ico';
    favicon.setAttribute('href', faviconPath);

    return () => {
      favicon.setAttribute('href', originalHref);
    };
  }, [faviconPath]);
}; 