import { DependencyList, useCallback, useState } from "react";

type CallBackFunc = (...args: any[] | never) => any;
type ReturnValue = { callback: CallBackFunc; isLoading: boolean };

export function useLoadingCallback<T extends CallBackFunc>(
  callback: T,
  deps: DependencyList,
): ReturnValue {
  const [isLoading, setLoading] = useState<boolean>(false);
  const innerCallback = useCallback(async (args) => {
    setLoading(true);
    await callback(args);
    setLoading(false);
  }, deps);

  return {
    callback: innerCallback,
    isLoading,
  };
}