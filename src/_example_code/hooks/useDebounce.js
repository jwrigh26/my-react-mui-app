import * as React from 'react';
import { isFunction } from 'utils/helpers';
// https://www.joshwcomeau.com/snippets/javascript/debounce/
// Our debounce function takes two arguments: a callback function and a duration in milliseconds.
// Cancel any pre-existing timeouts
// Schedule a new timeout
// When the timeout expires, we call our callback function with apply, and feed it whatever arguments we have.
const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

export function useDebounce(callback, delay = 250) {
  const handleDebounce = React.useMemo(
    () =>
      debounce((...args) => {
        if (isFunction(callback)) {
          callback(...args);
        }
      }, delay),
    []
  );

  return handleDebounce;
}
