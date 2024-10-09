import {useRef, useEffect} from 'react'

/**
 * useTimeout is a hook that makes working with timeouts safe within function components
 * @param callback function
 * @param delay number
 * @returns timeoutRef timeout reference in case you want to manually cancel the timeout outside of this (not required, it cancels itself on unmount)
 */
export default function useTimeout(callback, delay) {
  const timeoutRef = useRef()
  const callbackRef = useRef(callback)

  // Remember the latest callback:
  //
  // Without this, if you change the callback, when setTimeout kicks in, it
  // will still call your old callback. If you add `callback` to useEffect's deps, it will work fine but the
  // timeout will be reset.

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Set up the timeout:
  useEffect(() => {
    if (typeof delay === 'number') {
      timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay)
      // Clear timeout if the components is unmounted or the delay changes:
      return () => window.clearTimeout(timeoutRef.current)
    }
  }, [delay])

  // In case you want to manually clear the timeout from the consuming component...:
  return timeoutRef
}
