import {useMemo} from "react";
import {memoContent, tagsDummy, totalStepsList} from "@alvinComponents/Dummy";
import {css, Theme} from "@emotion/react";
import AAPipelineTitle from "@components/molecules/AAPipelineTitle";
import ColumnMilestone from "@components/molecules/ColumnMilestone";
import React from "react";
import {MAIN_HEADER_HEIGHT, SUB_HEADER_HEIGHT} from "src/config/constants";


export const NAV_WIDTH = '300px';

const containerWrap = (theme: Theme) => css`
  position: relative;
  width: ${NAV_WIDTH};
  left: -0.5rem;
  top: -0.5rem;
  
  background: white;
  height: calc(100vh - ${MAIN_HEADER_HEIGHT} - ${SUB_HEADER_HEIGHT});
  box-shadow: 5px 4px 20px rgba(0, 0, 0, 0.25);
`;

enum AAPortoflioStep { /** TEMPORARY TYPE **/
  investment_universe = 1,
  model_select = 2,
  model_config = 3,

}

const AAPipelineNav = ({portfolioName, step, ...props})=>{
  const allSteps = useMemo(()=>totalStepsList, []);

  const currentStepValue = step;

  return(
    <div css={css`height: 0px;`}>
      <div css={containerWrap}>
        <AAPipelineTitle
          mpTitle={portfolioName}
          memoContent={memoContent}
          tags={tagsDummy}
        />
        <ColumnMilestone totalStepsList={allSteps} currentStep={currentStepValue} />
      </div>
    </div>
  );
};


export default AAPipelineNav;