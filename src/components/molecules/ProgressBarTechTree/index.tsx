import { SerializedStyles } from "@emotion/serialize";
import { buttonResetStyle, selectOpacityStyle } from "@styles";
import React, { HTMLAttributes, MouseEventHandler } from "react";
import { css } from "@emotion/react";

export interface ProgressBarTechTreeProps {
  label: string;
  currentPercent: number;
}

const ProgressBarTechTree = ({
  label,
  currentPercent,
}: ProgressBarTechTreeProps) => {
  const weightBarOutlineCss = css`
    border: 2px solid #94a1a9;
    border-radius: 6px/3px;
    -webkit-border-radius: 6px/3px;
    -moz-border-radius: 6px/3px;
    width: 100%;
    height: 12px; // 높이
    display: flex;
    flex-direction: row;
    justify-content: h flex-start;
    align-items: center;
    padding: 1.3px;
  `;

  const weightBarInlineCss = (currentPercent: number) => css`
    background-color: #ececec; // 색상 확인
    border-radius: 3px;
    width: ${currentPercent}%;
    height: 100%;
  `;

  const weightBarLabelCss = css`
    padding-top: 2px;
    font-size: 10px;
    text-align: right;
    padding-bottom: 5px;
  `;

  return (
    <>
      <div css={[weightBarOutlineCss]}>
        <div css={[weightBarInlineCss(currentPercent)]}></div>
      </div>
      <div css={[weightBarLabelCss]}>
        <span>{label} </span>
        <span>{currentPercent}%</span>
      </div>
    </>
  );
};

export default ProgressBarTechTree;
