import { ChangeEvent } from "react";

export type DropdownType = {
  width?: number;
  title: string;
  filteredData: Array<{
    id: number;
    name: string;
  }>;
  checkedItems: Array<string>;
  show: boolean;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  clearCheckedItemsHandler: () => void;
  openDropdownHandler: () => void;
  searchTermHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  id: number;
};

export type MultiCheckboxType = {
  data: Array<{
    id: number;
    name: string;
  }>;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  checkedItems: Array<string>;
};
