import { Atoms } from '@recoil/constants';
import { atom } from 'recoil';

// export type MPTdata = { modelId: string; modelName: string };

export const mptDataState = atom({
  key: Atoms.MPTdata,
  default: null,
});
