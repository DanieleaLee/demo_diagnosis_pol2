import { modelConfigState } from '@recoil/atoms/modelConfig';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useCallback } from 'react';

export const useModelConfig = () => {
  const setModelConfigInner = useSetRecoilState(modelConfigState);

  const setModelConfig = useCallback((selState) => {
    setModelConfigInner(selState);
  }, []);

  return { setModelConfig };
};

export function useModelConfigValue() {
  return useRecoilValue(modelConfigState);
}
