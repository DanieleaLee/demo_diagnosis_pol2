import React, { useRef } from "react";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { flexRow } from "@styles";
import * as Typography from "@styles/typography";

const inputRangeStyle = css`
  &[type="range"] {
    width: 251px;
  }
  &[type="range"],
  &[type="range"]::-webkit-slider-runnable-track,
  &[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  &[type="range"]::-webkit-slider-runnable-track {
    /* margin: 5px 0; */
    height: 2px;
    width: 100%;
    background: #4a5c67;
    background-size: var(--background-size, 0%) 100%;
    background-repeat: no-repeat;
    border-radius: 2px;
    z-index: 1;
  }
  &[type="range"]::-webkit-slider-thumb {
    width: 13px;
    height: 13px;
    cursor: pointer;
    background: white;
    border: 1px solid #4a5c67;
    border-radius: 50%;
    margin-top: -5px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
  }
`;

const dotStyle = css`
  position: absolute;
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${Colors.primary3};
`;

const PfOlRangeBarContainerCss = css`
  ${flexRow};
  position: relative;
`;

const PfOlRangeBarLeftTextCss = css`
  margin-right: 3px;
`;

const PfOlRangeBarRightTextCss = css`
  margin-left: 3px;
`;

interface Props {
  min?: number;
  max?: number;
  value?: number | string;
  onTiltingValChangeHandler?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const TiltingRangebar = ({
  min,
  max,
  value,
  onTiltingValChangeHandler
}: Props) => {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <div css={PfOlRangeBarContainerCss}>
      <div css={PfOlRangeBarLeftTextCss}>
        <Typography.Body2 color={Colors.primary2}>0</Typography.Body2>
      </div>
      {/* prettier-ignore */}
      <div css={[dotStyle,css`left:11px; top:7.4px`]} />
      <input
        ref={inputRef}
        type="range"
        min={min}
        max={max}
        css={inputRangeStyle}
        value={value}
        onChange={onTiltingValChangeHandler}
      />
      {/* prettier-ignore */}
      <div css={[dotStyle,css`right: 27px;top:7.4px`]}/>
      <div css={PfOlRangeBarRightTextCss}>
        <Typography.Body2 color={Colors.primary2}>+10</Typography.Body2>
      </div>
    </div>
  );
};

export default TiltingRangebar;
