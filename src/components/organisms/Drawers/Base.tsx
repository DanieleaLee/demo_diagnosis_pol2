import {AnimatePresence} from "framer-motion";
import { useMemo, useState, useCallback } from "react";
import {motion} from "framer-motion";
import {css, useTheme} from "@emotion/react";
import { SerializedStyles } from "@emotion/serialize";
import Buttonable from "@components/atoms/Buttonable";

const backdropWrap = css`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height: 100%;

    display:flex;
    align-items:center;
    justify-content:center;
    background:rgba(0,0,0,.4)
  `;

const drawerWrap = css`
    display: flex;
    position: absolute;
    top:0;
    right: 0;
    height: 80vh;
    margin-top: 15vh;
    z-index:2;
  `;

const Drawer = ({ handleClose, handleOpen, width, children, labelText, ...props }) => {

  const theme = useTheme();

  const drawerLabel = css`
    position: relative;
    top:10%;
    border-radius: 0.25rem 0 0 0.25rem;
    background:${theme.colors.backgroundAccent2};
    color:white;
    padding: 0.5rem;
    align-self: flex-start;
    min-height: 150px;

    & p {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      transform:rotate(180deg);
    }
  `;

  const drawerBody = css`
    border-radius: 1rem 0 0 1rem;
    
    background:${theme.colors.backgroundPrimary1};
    opacity:1;
  `;

  const motionProps = useMemo(()=>({
    initial: {
      width: 0,
    },
    animate: {
      width,
      transition:{ damping:0, },
    },
    exit: {
      width:0,
    }
  }),[width]);

  return (
    <div css={drawerWrap} >

      <Buttonable css={drawerLabel} onClick={props.drawerOpen?handleClose:handleOpen} >
        <p>{labelText}</p>
      </Buttonable>

      <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => {}} >
        {props.drawerOpen &&
          <motion.div css={[drawerBody, props.containerCss]} {...motionProps} >
            {children}
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
};


export type BaseDrawerProps = {
  drawerOpen: boolean;
  width: number;
  labelText?:string;
  openDrawer?:()=>void;
  closeDrawer?: ()=>void;
  children: React.ReactNode;
  containerCss?: SerializedStyles
};


const BaseDrawer = ({ drawerOpen, openDrawer, closeDrawer, width, children, labelText, ...props }:BaseDrawerProps) => {

  const exitOnEscape = useCallback((e)=>{
    if(e.key === "Escape")
      closeDrawer()

  }, [closeDrawer]);


  return (
    <>
      {/** Back drop */}
      <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => {}} >
        {drawerOpen &&
          <motion.div css={backdropWrap} onClick={closeDrawer}
           initial={{ opacity: 0 }} animate={{ opacity: 1}} exit={{ opacity: 0}}/>
        }
      </AnimatePresence>

      {/** Drawer body */}
      <Drawer handleClose={closeDrawer} containerCss={props.containerCss} width={width}
              drawerOpen={drawerOpen} handleOpen={openDrawer} labelText={labelText}>

        <div css={css`height:100%; padding:1rem; z-index:2;`} tabIndex={0} onKeyDown={exitOnEscape}>
          {children}
        </div>

      </Drawer>
    </>
  );

};

export default BaseDrawer;