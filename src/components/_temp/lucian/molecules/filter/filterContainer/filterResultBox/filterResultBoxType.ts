export type FilterResultBoxType = {
  title: string;
  checkedElements: Array<string>;
  id: number;
  clearFiltersHandler: (id: number) => void;
  showCategories: boolean;
};
