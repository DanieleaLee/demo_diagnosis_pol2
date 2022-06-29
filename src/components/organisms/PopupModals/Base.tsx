import {AnimatePresence} from "framer-motion";
import { useMemo, useState, useCallback } from "react";
import {motion} from "framer-motion";
import {css} from "@emotion/react";
import { SerializedStyles } from "@emotion/serialize";

const motionProps = {
  variants : {
    hidden: {
      y: "-100vh",
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 40,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  },
  initial: "hidden",
  animate: "visible",
  exit: "exit",

};


const modalBody = css`
  // max-width: 800px;
  background:white;
  opacity:1;
  padding: 1rem;
`;

const Modal = ({ handleClose, children, ...props }) => {

  const backdropWrap = useMemo(()=> css`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height: 100%;

    display:flex;
    align-items:center;
    justify-content:center;
    background:rgba(0,0,0,.8)
  `,[]);


  return (
    <motion.div
      css={backdropWrap}
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}  // Modal 클릭했을때 close 방지.
        css={[modalBody, props.containerCss]}
        {...motionProps}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};


export type BaseModalProps = {
  modalOpen: boolean;
  openModal?:()=>void;
  closeModal?: ()=>void;
  children: React.ReactNode;
  containerCss?: SerializedStyles
};


const BaseModal = ({ modalOpen, openModal, closeModal, children, ...props }:BaseModalProps) => {

  const exitOnEscape = useCallback((e)=>{
    if(e.key === "Escape")
      closeModal()

  }, [closeModal]);


  return (
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
      onExitComplete={() => {}}
    >
      {(modalOpen) && (
        <Modal handleClose={closeModal} containerCss={props.containerCss}>
          <div tabIndex={0} onKeyDown={exitOnEscape}>
            {children}
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );

}

export default BaseModal;