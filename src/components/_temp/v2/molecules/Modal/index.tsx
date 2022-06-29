import React, { RefObject, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";

const ModalBackgroundStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const useModal = (initialMode = false) => {
  const [isOpen, setIsOpen] = useState(initialMode);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return { isOpen, openModal, closeModal };
};

export type ModalProps = {
  closeModal?: () => void;
  children: React.ReactChild;
};

/**
 * 모달 바깥영역 클릭시 닫히도록 설정하려면
 * useModal()을 사용하여 closeModal 프롭스를 사용
 *
 */
const Modal = ({ closeModal, children }: ModalProps) => {
  const modalRef = useRef(null);

  const handleClickOutside = ({ target }) => {
    if (target === modalRef.current) closeModal();
  };

  useEffect(() => {
    if (!closeModal) return;
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={modalRef} css={ModalBackgroundStyle}>
      {children}
    </div>
  );
};

export default Modal;
