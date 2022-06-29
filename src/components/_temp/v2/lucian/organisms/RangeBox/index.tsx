import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import InvalidBox from "@components/molecules/InvalidBox";
import RangeRow from "@lucian2Components/molecules/RangeRow";
import { flexCenter } from "src/styles";

const invalidBoxContainerStyle = (boxPadding: number) => css`
  position: absolute;
  left: 26px;
  bottom: 20px;
  width: calc(100% - ${boxPadding}px);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

type RangeType = { [s: string]: { min: number; max: number } };
type RangeBoxProps = {
  disabled?: boolean;
  rowData: { id: string }[];
  rowId: string;
  onSubmit?: (rangeData: any) => void;
  openBox?: boolean;
};
const RangeBox = ({ disabled, rowData, rowId, onSubmit, openBox=true }: RangeBoxProps) => {
  const [data, setData] = useState(rowData);
  const [ranges, setRanges] = useState<RangeType>();
  const [totalRanges, setTotalRanges] = useState({ min: 0, max: 100 });
  const [sums, setSums] = useState<{ minSum: number; maxSum: number }>();

  useEffect(() => {
    if (!ranges) return;
    const minMaxValues = Object.values(ranges);
    const _sums = minMaxValues.reduce(
      (prev, curr) => {
        return {
          minSum: prev.minSum + curr.min,
          maxSum: prev.maxSum + curr.max,
        };
      },
      { minSum: 0, maxSum: 0 }
    );
    setSums(_sums);
    onSubmit && onSubmit(ranges);
  }, [ranges]);

  useEffect(() => {
    if (!data) return;
    const temp = {};
    data.forEach((el) => {
      temp[el.id] = { min: 0, max: 100 };
    });
    setRanges(temp);
  }, [data]);

  useEffect(() => {
    if (!ranges) return;
    const _ranges = { ...ranges };
    for (let k in _ranges) {
      _ranges[k] = { min: totalRanges.min, max: totalRanges.max };
    }
    setRanges(_ranges);
  }, [totalRanges]);

  const changeRangeHandle = (props: {
    id: string;
    min: number;
    max: number;
  }) => {
    const { id, min, max } = props;
    setRanges((prev) => ({ ...prev, [id]: { min: min, max: max } }));
  };

  return (
    <div>
      {ranges && (
        <RangeRow
          key={rowId}
          rowId={rowId}
          minLimit={100}
          maxLimit={0}
          minValue={ranges[rowId].min}
          maxValue={ranges[rowId].max}
          onApply={changeRangeHandle}
          disabled={disabled}
          openBox={openBox}
        />
      )}
      {/* {!disabled && sums && (
        <div css={invalidBoxContainerStyle(54)}>
          {sums.maxSum < 100 && (
            <InvalidBox
              errorMessage={`Sum of max is [${sums.maxSum}]%, sum of max should be more than or equal 100%`}
            />
          )}
          {sums.minSum > 50 && (
            <InvalidBox
              errorMessage={`Sum of min is [${sums.minSum}]%, sum of min should be less than or equal 100%`}
            />
          )}
        </div>
      )} */}
    </div>
  );
};

export default RangeBox;
