import React from 'react';
import { css } from '@emotion/react';
import { RiCloseCircleFill } from 'react-icons/ri';

const invalidBoxStyle = css`
  display: flex;
  background: #ffe5e5;
  border: 1px solid #ffbfbf;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: -0.03em;
  color: #d47878;
  padding: 9px 9px 11px 11px;
`;

const closeCircleWrapper = css`
  width: 12px;
  height: 12px;
  margin-right: 7px;
`;
const messageStyle = css`
  /* word-break: break-all; */
  /* white-space: pre-wrap; */
`;

export type InvalidBoxProps = {
  errorMessage: string;
};
const InvalidBox = ({ errorMessage }: InvalidBoxProps) => {
  return (
    <div css={invalidBoxStyle}>
      <span css={closeCircleWrapper}>
        <RiCloseCircleFill size={12} />
      </span>
      <span css={messageStyle}>{errorMessage}</span>
    </div>
  );
};

export default InvalidBox;
