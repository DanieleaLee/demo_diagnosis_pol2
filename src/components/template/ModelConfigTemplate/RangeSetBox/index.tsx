import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { ContainerCss } from '@interfaces/global';
import ModelConfigRangeRow from '@components/molecules/ModelConfigRangeRow';
import BasicBox from '@components/atoms/BasicBox';
import InvalidBox from '@components/molecules/InvalidBox';

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
type RangeSetBoxProps = {
  disabled?: boolean;
  rowData: { id: string; title: string }[];
  onSubmit?: (rangeData: any) => void;
  allRangeSetTitle?: string;
  containerCss?: ContainerCss;
};
const RangeSetBox = ({ disabled, rowData, onSubmit, allRangeSetTitle, containerCss }: RangeSetBoxProps) => {
  const [data, setData] = useState(rowData);
  const [ranges, setRanges] = useState<RangeType>();
  const [totalRanges, setTotalRanges] = useState({ min: 0, max: 100 });
  const [sums, setSums] = useState<{ minSum: number; maxSum: number }>();

  useEffect(() => {
    if (!ranges) return;
    const minMaxValues = Object.values(ranges);
    const _sums = minMaxValues.reduce(
      (prev, curr) => {
        return { minSum: prev.minSum + curr.min, maxSum: prev.maxSum + curr.max };
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

  const changeTotalRangeHandle = (props: { min: number; max: number }) => {
    const { min, max } = props;
    setTotalRanges({ min: min, max: max });
  };

  const changeRangeHandle = (props: { id: string; min: number; max: number }) => {
    const { id, min, max } = props;
    setRanges((prev) => ({ ...prev, [id]: { min: min, max: max } }));
  };
  return (
    <div css={containerCss}>
      <BasicBox
        width={304}
        height={463}
        borderColor="#CED9E1"
        scrollGap={13}
        paddingTop={11}
        paddingBottom={10}
        paddingLeft={30}
        paddingRight={30}
        isScroll
      >
        {data && allRangeSetTitle && (
          <ModelConfigRangeRow
            rowId={'total'}
            title={allRangeSetTitle}
            minLimit={Math.floor(100 / data.length)}
            maxLimit={Math.ceil(100 / data.length)}
            minValue={totalRanges.min}
            maxValue={totalRanges.max}
            onApply={changeTotalRangeHandle}
            disabled={disabled}
          />
        )}
        {ranges &&
          data.map((d, i) => (
            <ModelConfigRangeRow
              key={d.id}
              rowId={d.id}
              title={d.title}
              minLimit={100}
              maxLimit={0}
              minValue={ranges[d.id].min}
              maxValue={ranges[d.id].max}
              onApply={changeRangeHandle}
              disabled={disabled}
              isLast={i === data.length - 1}
            />
          ))}
        {!disabled && sums && (
          <div css={invalidBoxContainerStyle(54)}>
            {sums.maxSum < 100 && (
              <InvalidBox
                errorMessage={`Sum of max is [${sums.maxSum}]%, sum of max should be more than or equal 100%`}
              />
            )}
            {sums.minSum > 100 && (
              <InvalidBox
                errorMessage={`Sum of min is [${sums.minSum}]%, sum of min should be less than or equal 100%`}
              />
            )}
          </div>
        )}
      </BasicBox>
    </div>
  );
};

export default RangeSetBox;
