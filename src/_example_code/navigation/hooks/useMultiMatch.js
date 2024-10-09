import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

export const useMultiMatch = (paths) => {
  const location = useLocation();

  return useMemo(() => {
    for (let path of paths) {
      // Manually create the match object for each path
      const match = matchPath({ path, end: false }, location.pathname);
      if (match) return match;
    }
    return null;
  }, [paths, location.pathname]);
};
