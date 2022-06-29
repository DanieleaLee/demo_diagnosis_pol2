export type FilterBoxType = {
  data: Array<{
    id: number;
    name: string;
  }>;
  title: string;
  id: number;
  clearFiltersHandler: (id: number) => void;
  changeCheckedItemsState: (idx: number, checkedArr: Array<string>) => void;
  checkedItems: Array<string>;
};
