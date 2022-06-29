import BaseDrawer, {BaseDrawerProps} from "./Base";
import {css} from "@emotion/react";
import RightMenuBody from "@alvinComponents/molecules/RightMenu/RightMenuBody";

export interface IndexsetLoadDrawerProps extends Omit<BaseDrawerProps, "children"> {
  update: () => void;
}

const IndexsetLoadDrawer = ({drawerOpen, openDrawer, closeDrawer, update, width}:IndexsetLoadDrawerProps) => {


  return (
    <BaseDrawer drawerOpen={drawerOpen} closeDrawer={closeDrawer} openDrawer={openDrawer} width={width} labelText={'LOAD'}>
      <div className={'container'} css={css`height: 100%; overflow-y:scroll; overflow-x:hidden`}>
        <RightMenuBody width={width} minHeight={200} onClick={()=>{}}/>
      </div>
    </BaseDrawer>
  );
};


export default IndexsetLoadDrawer;