import { Atoms } from '@recoil/constants';
import { atom } from 'recoil';

// export type SelectedModel = { modelId: string; modelName: string };

export const modelConfigState = atom({
  key: Atoms.ModelConfig,
  default: { 
    samplePeriod: {
      start: "2019-01-01",
      end: "2022-03-31"
    }, 
    constraintsIU: null, 
    constrainsAssetClass: null, 
    optimizationGoal: 0 
  }
});
