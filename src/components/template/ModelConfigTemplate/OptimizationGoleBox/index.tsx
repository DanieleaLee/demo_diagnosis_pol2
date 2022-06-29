import React, { useEffect, useState,useRef } from 'react';
import { css } from '@emotion/react';
import BasicBox from '@components/atoms/BasicBox';
import * as Typography from '@styles/typography';
import RangeBarSingle from '@components/molecules/RangeBarSingle';
import HelpTooltip from '@components/molecules/HelpTooltip';
import { useModelConfig, useModelConfigValue } from "@recoil/hooks/useModelConfig";

const OptimizationGole = () => {
  const [checkedIndex, setCheckedIndex] = useState(0);
  const { setModelConfig } = useModelConfig(); // recoil state 0505
  const modelConfigValue = useModelConfigValue(); // recoil state 0505

  useEffect(()=>{
    setModelConfig({
      ...modelConfigValue,
      optimizationGoal: checkedIndex
    });
  },[checkedIndex])

  return (
    <BasicBox
      width={401}
      height={463}
      borderColor="#CED9E1"
      paddingTop={11}
      paddingBottom={25}
      paddingLeft={35}
      paddingRight={50}
    >
      <RadioRow
        title={'Maximize Sharpe Ratio'}
        description="The Sharpe ratio was developed by Nobel laureate William F. Sharpe and is used to help investors understand the return of an investment compared to its risk. (Sharpe Ratio = Return / Volatility)"
        checked={checkedIndex === 0}
        onChange={() => setCheckedIndex(0)}
      />
      <RadioRow
        title={'Minimize Volatility'}
        description="Volatility is the standard deviation of returns."
        checked={checkedIndex === 1}
        onChange={() => setCheckedIndex(1)}
      />
      <RadioRow2
        title={`Minimize Annual Volatility subject\nto Targeted Annual Return`}
        description="Expected risk is minimized of for a given level of returns."
        checked={checkedIndex === 2}
        onChange={() => setCheckedIndex(2)}
      />
      <RadioRow2
        title={`Maximize Annual Return subject\nto Targeted Annual Volatility`}
        description="Expected return is maximized for a given level of risk."
        checked={checkedIndex === 3}
        onChange={() => setCheckedIndex(3)}
      />
    </BasicBox>
  );
};

export default OptimizationGole;

const rowWrapStyle = css`
  width: 100%;
  min-height: 43px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

type RadiowRowProps = { title?: string; checked: boolean; onChange: () => void; description?: string };
const RadioRow = ({ title, checked, onChange, description }: RadiowRowProps) => {
  return (
    <div css={rowWrapStyle}>
      <input type="radio" checked={checked} onChange={onChange} />
      {/* prettier-ignore */}
      <Typography.Body3 css={css`white-space: pre-wrap;`} color="#2F3B43">
        {title}
      </Typography.Body3>
      <HelpTooltip
        size={14}
        title={title}
        description={description}
        tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
      />
    </div>
  );
};

const row2ContainerStyle = css`
  /* border: 1px solid black; */
`;

const rowWrapStyle2 = css`
  width: 100%;
  min-height: 43px;
  display: flex;
  gap: 10px;
`;

const RadioRow2 = ({ title, checked, onChange, description }: RadiowRowProps) => {
  return (
    <div css={row2ContainerStyle}>
      <div css={rowWrapStyle2}>
        {/* prettier-ignore */}
        <input css={css`margin-top:7px;`} type="radio" checked={checked} onChange={onChange} />
        <Typography.Body3
          // prettier-ignore
          css={css`white-space: pre-wrap;margin-top:4px;`}
          color="#2F3B43"
        >
          {title}
        </Typography.Body3>
        <HelpTooltip
          size={14}
          title={title}
          description={description}
          containerCss={css`margin-top:6px;`} // prettier-ignore
          tooltipBoxCss={css`left: 7px;top: 8px;`} // prettier-ignore
        />
      </div>
      <div
        css={css`
          margin-left: 32px;
        `}
      >
        <RangeBarSingle onSubmit={(range) => console.log(range)} visibleType="percentage" disabled={!checked} />
      </div>
    </div>
  );
};
