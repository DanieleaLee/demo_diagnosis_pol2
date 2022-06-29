import {css} from "@emotion/react";

export type InvestmentUniverse = {
  constituent: string;
  weight: number;
};

export type Constraints = {
  assetClass: string;
  min?: number;
  max?: number;
};


export type PortfolioBriefProps = {
  iu: Array<InvestmentUniverse>;
  tnc: Array<Constraints>;
  wm: string[];
  note: string;
};

const PortfolioBrief =  ({iu, tnc, wm, note}: PortfolioBriefProps) => {
  return(
    <>
      <div css={css`margin:0.5rem;`}>
        <div>Note</div>
        <textarea css={css`display:block; width:100%; `} value={note} disabled={true}/>
      </div>

      <div css={css`display:flex;`}>
        <div css={css`width: 33%; margin:0.5rem;`}>
          <span>Investment Universe</span>
          <div css={css`height: 100px; border: 1px solid black;`}>
            <ul>
              {iu && iu.map((ele, k)=>(
                <li key={k}>{`${ele.constituent} (${ele.weight*100}%)`}</li>
              ))}
            </ul>
          </div>
        </div>
        <div css={css`width: 33%; margin:0.5rem;`}>
          <span>Target & Constraints</span>
          <div css={css`height: 100px; border: 1px solid black;`}>
            <ul>
              {tnc && tnc.map((ele, k)=>(
                <li key={k}>{ (ele.min || ele.max) && `${ele.assetClass} (${(ele.min) || ""} ~ ${ele.max && ele.max})`}</li>
              ))}
            </ul>

          </div>
        </div>
        <div css={css`width: 33%; margin:0.5rem;`}>
          <span>Investment Universe</span>
          <div css={css`height: 100px; border: 1px solid black;`}>
            <ul>
              {wm && wm.map((ele, k)=>(
                <li key={k}>{ele}</li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioBrief;