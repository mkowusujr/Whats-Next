import { useEffect, useRef } from 'react';

/**
 * Hook that runs the provided callback function on subsequent renders, excluding the initial render.
 *
 * @param callback - The callback function to be executed on subsequent renders.
 * @param dependencies - An array of dependencies for the effect.
 */
export default function useSubsequentEffect(
  callback: () => void,
  dependencies: any[]
) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      callback();
    }
  }, [...dependencies]);
}
