import React, { useState } from "react";
import { css } from "@emotion/react";
import RangeSetButton from "@components/molecules/RangeSetButton";
import RangeSetBtn from "../RangeBarContents";
import RangeBarContents from "@lucian2Components/molecules/RangeBarContents";

const rowWrapStyle = css``;

export type RangeRowProps = {
  disabled?: boolean;
  rowId: string;
  minLimit: number;
  maxLimit: number;
  minValue: number;
  maxValue: number;
  onApply: (props: { id?: string; min: number; max: number }) => void;
  openBox?: boolean;
};

const RangeRow = ({
  disabled,
  rowId,
  minLimit,
  maxLimit,
  minValue,
  maxValue,
  onApply,
  openBox,
}: RangeRowProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div css={rowWrapStyle}>
      <RangeBarContents
        rowId={rowId}
        disabled={disabled}
        open={open}
        setOpen={setOpen}
        minValue={minValue}
        maxValue={maxValue}
        minLimit={minLimit}
        maxLimit={maxLimit}
        onApply={onApply}
        openBox={openBox}
      />
    </div>
  );
};

export default RangeRow;
