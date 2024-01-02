import { useEffect, useRef } from 'react';

/**
 * Hook that runs the provided callback function on subsequent renders, excluding the initial render.
 *
 * @param {Function} callback - The callback function to be executed on subsequent renders.
 * @param {Array} dependencies - An array of dependencies for the effect.
 */
export default function useSubsequentEffect(callback, dependencies) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      callback();
    }
  }, [...dependencies]);
}
