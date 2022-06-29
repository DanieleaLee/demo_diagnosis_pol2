import { mptDataState } from '@recoil/atoms/mptData';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useCallback } from 'react';

export const useMPTdata = () => {
  const setMPTdataInner = useSetRecoilState(mptDataState);

  const setMPTdata = useCallback((selState) => {
    setMPTdataInner(selState);
  }, []);

  return { setMPTdata };
};

export function useMPTdataValue() {
  return useRecoilValue(mptDataState);
}