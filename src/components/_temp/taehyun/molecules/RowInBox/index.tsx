import React from 'react';
import { css } from '@emotion/react';
import Buttonable from '@components/atoms/Buttonable';

const rowWrapStyle = (isLast: boolean) => css`
  width: 100%;
  /* min-width: 242px; */
  height: 43px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${isLast ? 'none' : '0.5px solid #ced9e1'};
`;
const buttonContainerStyle = (disabled: boolean) => css`
  background-color: ${disabled ? '#E4E7EA' : '#546a78;'};
  color: ${disabled ? '#9DA6AD' : '#ffffff;'};
  border-radius: 4px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 10px;
  line-height: 12px;
  padding: 8px 10px;
  &:not(:disabled) {
    cursor: ${disabled ? 'default' : 'pointer'};
  }
`;
const titleStyle = (disabled: boolean) => css`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: ${disabled ? '#9DA6AD' : '#2f3b43'};
`;
type RowInBoxProps = {
  disabled?: boolean;
  isLast?: boolean;
  rowId: string;
  title: string;
  minLimit: number;
  maxLimit: number;
  min: number;
  max: number;
  onApply: (props: { id?: string; min: number; max: number }) => void;
};
/**
 *
 *
 */
const RowInBox = ({ disabled, isLast, rowId, title, minLimit, maxLimit, min, max, onApply }: RowInBoxProps) => {
  return (
    <div css={rowWrapStyle(isLast)}>
      <span css={titleStyle(disabled)}>{title}</span>
      <Buttonable
        disabled={disabled}
        containerCss={buttonContainerStyle(disabled)}
        onClick={() => onApply({ id: rowId, min: 25, max: 80 })}
      >
        {`${min}%-${max}%`}
      </Buttonable>
    </div>
  );
};

export default RowInBox;
