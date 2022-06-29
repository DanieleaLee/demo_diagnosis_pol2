import { portfolioSelState, PortfolioIdList } from "@recoil/atoms/portfolioSel";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback } from "react";


export const usePortfolioSel = () => {
  const setPortfolioSelInner = useSetRecoilState<PortfolioIdList>(portfolioSelState);

  const setPortfolioSel = useCallback((selState: PortfolioIdList) => {
    setPortfolioSelInner(selState);
  }, []);

  return {setPortfolioSel};
};

export function usePortfolioSelValue(){
  return useRecoilValue(portfolioSelState);
}