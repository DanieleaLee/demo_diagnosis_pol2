import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

export type FilterTemplateType = {
  showCategories: boolean;
  width?: number;
  filterData: EmotionJSX.Element[];
  filtersResult: EmotionJSX.Element[];
  sendDataByPressingApplyBtn: () => void;
};
