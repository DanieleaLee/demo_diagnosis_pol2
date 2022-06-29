import { useState } from "react";

export const useModal = (initialMode = false) => {
  const [open, setOpen] = useState(initialMode);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return [open, openModal, closeModal];
};

export const stringDesc = (arr: string[]) => {
  return arr.sort(function (a, b) {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  });
};

export const stringAsc = (arr: string[]) => {
  return arr.sort(function (a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
};
