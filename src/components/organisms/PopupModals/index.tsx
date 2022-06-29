import { useState } from "react";
import ConfirmDeleteMP from "./ConfirmDeleteMP";
import CreateMP from "./CreateMP";

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  return { modalOpen, closeModal, openModal };
};



export default {
  ConfirmDeleteMP,
  CreateMP,
}