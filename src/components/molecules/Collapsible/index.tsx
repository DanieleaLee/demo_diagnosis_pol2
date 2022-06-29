import {AnimatePresence, motion} from "framer-motion";
import {css} from "@emotion/react";
import {useCallback, useState} from "react";



export const useCollapsible  = (initialOpen)=>{

  const [isOpen, setIsOpen] = useState(initialOpen);

  const toggle = useCallback(()=>{
    setIsOpen(!isOpen)
  }, [isOpen]);

  return {toggle, isOpen};
};


export type CollapsibleProps = {
  isOpen: boolean;
  children: React.ReactNode;
  height: number;
  duration?: number;
};

const Collapsible = ({isOpen, children, height, duration=0.2}:CollapsibleProps) => {

  return <AnimatePresence initial={false}>
    {isOpen &&
      <motion.div
        css={css`overflow: hidden; padding: 0.5rem;`}
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { height },
          collapsed: { height: 0 }
        }}
        transition={{ duration }}
      >
        {children}
      </motion.div>
    }
  </AnimatePresence>

};



export default Collapsible;