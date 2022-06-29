import { selectedModelState, SelectedModel } from '@recoil/atoms/selectedModel';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useCallback } from 'react';

export const useSelectedModel = () => {
  const setSelectedModelInner = useSetRecoilState<SelectedModel>(selectedModelState);

  const setSelectedModel = useCallback((selState: SelectedModel) => {
    setSelectedModelInner(selState);
  }, []);

  return { setSelectedModel };
};

export function useSelectedModelValue() {
  return useRecoilValue(selectedModelState);
}
