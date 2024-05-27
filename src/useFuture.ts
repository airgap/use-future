import { useState, useEffect, DependencyList } from "react";

export const useFuture = <T>(
  promiseFactory: () => Promise<T>,
  deps: DependencyList = [],
): readonly [T | undefined, unknown | undefined, boolean] => {
  const [value, setValue] = useState<T | undefined>(undefined);
  const [error, setError] = useState<unknown | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const promise = promiseFactory();
        const resolvedValue = await promise;
        if (isMounted) {
          setValue(resolvedValue);
          setError(undefined);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setValue(undefined);
          setError(err);
          setLoading(false);
        }
      }
    };

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, deps);

  return [value, error, loading] as const;
};
