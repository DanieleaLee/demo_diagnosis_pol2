import { Atoms } from '@recoil/constants';
import { atom } from 'recoil';

export type SelectedModel = { modelId: string; modelName: string; description: string };

export const selectedModelState = atom<SelectedModel>({
  key: Atoms.SelectedModel,
  default: { modelId: null, modelName: null, description: null },
});
