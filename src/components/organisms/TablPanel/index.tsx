import React, {useState, ReactNode} from "react";
import {css} from "@emotion/react";
import colors from "../../../styles/colors";


const panelWrapper = css`
  width:100%;
  display:flex;
  flex-wrap:wrap;
  
  & > div > input {
    display:none;
  } 
  
  & > div > input+label {
    flex:1;
    max-width: 200px;
    shadow-right:1px;
    text-align: center;
    padding: 0.5rem;
  } 
  
  & > div > input:checked+label {
    font-weight: bold;
    color: ${colors.primary2};
    border-bottom: solid ${colors.primary2};
  } 
  
  & > div.tab-body {
    display:none;
    padding: 1rem;
    border: solid ${colors.backgroundAccent2} 0.5px;
  } 
  & > div > input:checked+label+div.tab-body {
    display: block;
  } 
`;

const tabBodyWrapper = css`
  width: 100%;
  order:1;
`;

export interface TabItemTuple extends Array < string | ReactNode > {
  0: string,
  1: ReactNode
}


export interface TabPanelProps {
  tabContents: Array<TabItemTuple>,
}

const TabPanel = ({ tabContents, ...props}: TabPanelProps)=>{

  const [tabSel, setTabSel] = useState(0);

  return (
    <div css={panelWrapper}>
      {
        tabContents.map((tc,k) => {


          const [tabHeader, tabBody] = tc;
          return(
            <>
              <div className={'RightMenuBody'}>
                <input type='radio' id={`tc-${k}`} checked={(tabSel === k)} onClick={()=>{setTabSel(k)}}/>
                <label htmlFor={`tc=${k}`} onClick={()=>{setTabSel(k)}}>{tabHeader}</label>
              </div>
              <div className='tab-body' role={'tabpanel'} css={tabBodyWrapper}>
                {tabBody}
              </div>
            </>
          );
        })
      }
    </div>
  );

};

export default TabPanel;