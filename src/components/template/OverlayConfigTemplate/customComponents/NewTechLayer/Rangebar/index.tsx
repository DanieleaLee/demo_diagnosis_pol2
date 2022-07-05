import React, { useState, useEffect } from "react";
import RangeBtn from "@components/template/OverlayConfigTemplate/customComponents/NewTechLayer/RangeBtn";

type RangeType = { [s: string]: { min: number; max: number } };
type RangeBoxProps = {
  disabled?: boolean;
  rowData: { id: string }[];
  rowId: string;
  onSubmit?: (rangeData: any) => void;
  openBox?: boolean;
  value?:number;
};

const RangeBar = ({
  disabled,
  rowData,
  rowId,
  openBox = true,
  value
}: RangeBoxProps) => {
  const [data, setData] = useState(rowData);
  const [ranges, setRanges] = useState<RangeType>();
  const [totalRanges, setTotalRanges] = useState({ min: 0, max: value });
  const [sums, setSums] = useState<{ minSum: number; maxSum: number }>();

  useEffect(() => {
    if (!ranges) return;
    const minMaxValues = Object.values(ranges);
    const _sums = minMaxValues.reduce(
      (prev, curr) => {
        return {
          minSum: prev.minSum + curr.min,
          maxSum: prev.maxSum + curr.max
        };
      },
      { minSum: 0, maxSum: 0 }
    );
    setSums(_sums);
  }, [ranges]);

  useEffect(() => {
    if (!data) return;
    const temp = {};
    data.forEach((el) => {
      temp[el.id] = { min: 0, max: value };
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

  const applyHandler = (props: { id: string; min: number; max: number }) => {
    const { id, min, max } = props;
    setRanges((prev) => ({ ...prev, [id]: { min: min, max: max } }));
  };

  return (
    <div>
      {ranges && (
        <RangeBtn
          key={rowId}
          rowId={rowId}
          minLimit={value}
          maxLimit={0}
          minValue={ranges[rowId].min}
          maxValue={ranges[rowId].max}
          onApply={applyHandler}
          disabled={disabled}
          openBox={openBox}
          value={value}
        />
      )}
    </div>
  );
};

export default RangeBar;
