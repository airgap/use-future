import { useState, useEffect, useCallback } from "react";

export const useFuture = <T>(
  promiseFactory: () => Promise<T>,
  deps: unknown[] = [],
): [T | undefined, unknown | undefined, boolean] => {
  const [value, setValue] = useState<T | undefined>(undefined);
  const [error, setError] = useState<unknown | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedPromiseFactory = useCallback(promiseFactory, deps);

  useEffect(() => {
    let isMounted = true;
    memoizedPromiseFactory()
      .then((resolvedValue: T) => {
        if (isMounted) {
          setValue(resolvedValue);
          setError(undefined);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setValue(undefined);
          setError(err);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    };
  }, [memoizedPromiseFactory]);

  return [value, error, loading];
};
