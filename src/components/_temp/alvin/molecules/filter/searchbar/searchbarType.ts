// Searchbar with filter button
export type SearchBarWithFilterBtnType = {
  sendDataPressingEnterKey: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  sendDataByPressingSearchBtn: () => void;
  addInputValHandler: (text: string) => void;
  showCategories: boolean;
  openFilterContainer: boolean;
  clearInputValHandler: () => void;
  openFilterContainerHandler: () => void;
  inputVal: string;
  setInputVal: React.Dispatch<React.SetStateAction<string>>;
  width?: number;
};

// Searchbar
export type SearchBarType = {
  width?: number;
  height?: number;
  addInputValHandler: (text: string) => void;
  clearInputValHandler: () => void;
  sendDataByPressingSearchBtn: () => void;
  sendDataPressingEnterKey: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  inputVal: string;
  setInputVal: React.Dispatch<React.SetStateAction<string>>;
};
