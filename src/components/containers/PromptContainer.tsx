import {backgroundWrap} from "@styles/common";
import {css} from "@emotion/react";
import { SerializedStyles } from "@emotion/serialize";


export type PromptPageParams= {
  containerCss?: SerializedStyles;
  children: React.ReactNode;
}

const promptWrap = css`
  width: 738px;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 10vh;
  background-color: white;
  padding: 3rem 6rem;
  text-align: center;
  
`;

const PromptContainer = ({containerCss, children}: PromptPageParams) => {

  return(
    <div css={backgroundWrap}>

      <div css={promptWrap}>
        {children}
      </div>
    </div>
  );
};

export default PromptContainer;