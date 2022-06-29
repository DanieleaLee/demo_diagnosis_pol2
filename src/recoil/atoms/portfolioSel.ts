import { Atoms } from "@recoil/constants";
import { atom } from "recoil";


export type PortfolioIdList = Array<string>;


export const portfolioSelState = atom<PortfolioIdList>({
  key: Atoms.PortfolioSel,
  default: [],
});