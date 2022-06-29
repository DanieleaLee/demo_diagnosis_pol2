import React, { useState } from 'react';
import { css } from '@emotion/react';
import RangeSetButton from '../RangeSetButton/index';
import * as Typography from '@styles/typography';

const rowWrapStyle = (isLast: boolean) => css`
  width: 100%;
  height: 43px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${isLast ? 'none' : '0.5px solid #ced9e1'};
  /* position: static; */
`;

const titleStyle = css`
  font-weight: 500;
  line-height: 16px;
`;
export type ModelConfigRangeRowProps = {
  disabled?: boolean;
  isLast?: boolean;
  rowId: string;
  title: string;
  minLimit: number;
  maxLimit: number;
  minValue: number;
  maxValue: number;
  onApply: (props: { id?: string; min: number; max: number }) => void;
};
/**
 *
 *
 */
const ModelConfigRangeRow = ({
  disabled,
  isLast,
  rowId,
  title,
  minLimit,
  maxLimit,
  minValue,
  maxValue,
  onApply,
}: ModelConfigRangeRowProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div css={rowWrapStyle(isLast)}>
      <Typography.Body3 css={titleStyle} color={disabled ? '#9DA6AD' : '#2f3b43'}>
        {title}
      </Typography.Body3>
      <RangeSetButton
        rowId={rowId}
        disabled={disabled}
        open={open}
        setOpen={setOpen}
        minValue={minValue}
        maxValue={maxValue}
        minLimit={minLimit}
        maxLimit={maxLimit}
        onApply={onApply}
      />
    </div>
  );
};

export default ModelConfigRangeRow;
