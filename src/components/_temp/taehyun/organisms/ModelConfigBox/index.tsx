import React, { useState } from 'react';
import { css } from '@emotion/react';
import RowInBox from '@taehyunComponents/molecules/RowInBox';
import { useEffect } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';

const modelConfigBoxStyle = (disabled: boolean) => css`
  width: 304px;
  padding: 18px 30px;
  height: 463px;
  background-color: ${disabled ? '#EEF2F5' : '#ffffff'};
  border: 0.5px solid #ced9e1;
  border-radius: 8px;
  overflow-y: auto;
  position: relative;
`;

const invalidBoxContainerStyle = css`
  position: absolute;
  left: 26px;
  bottom: 20px;
  width: calc(100% - 52px);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
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

type RangeType = { [s: string]: { min: number; max: number } };
type ModelConfigBoxProps = {
  disabled?: boolean;
};
const ModelConfigBox = ({ disabled }: ModelConfigBoxProps) => {
  const [data, setData] = useState(DATA);
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
    <>
      <div
        css={css`
          margin-bottom: 10px;
        `}
      >
        <button onClick={() => setTotalRanges({ min: 25, max: 40 })}>valid</button>
        <button onClick={() => setTotalRanges({ min: 30, max: 40 })}>only minSum invalid</button>
        <button onClick={() => setTotalRanges({ min: 20, max: 10 })}>only maxSum invalid</button>
        <button onClick={() => setTotalRanges({ min: 50, max: 15 })}>minSum and maxSum invalid</button>
      </div>
      <div css={[modelConfigBoxStyle(disabled)]}>
        {!disabled && sums && (
          <div css={invalidBoxContainerStyle}>
            {sums.maxSum < 100 && (
              <div css={invalidBoxStyle}>
                <span css={closeCircleWrapper}>
                  <RiCloseCircleFill size={12} />
                </span>
                <span>Sum of max is [{sums.maxSum}]%, sum of max should be more than or equal 100%</span>
              </div>
            )}
            {sums.minSum > 100 && (
              <div css={invalidBoxStyle}>
                <span css={closeCircleWrapper}>
                  <RiCloseCircleFill size={12} />
                </span>
                <span>Sum of min is [{sums.minSum}]%, sum of min should be less than or equal 100%</span>
              </div>
            )}
          </div>
        )}
        {data && (
          <RowInBox
            rowId={'total'}
            title={'Total'}
            minLimit={100 / data.length}
            maxLimit={100 / data.length}
            min={totalRanges.min}
            max={totalRanges.max}
            onApply={changeTotalRangeHandle}
            disabled={disabled}
          />
        )}
        {ranges &&
          data.map((d, i) => (
            <RowInBox
              key={d.id}
              rowId={d.id}
              title={d.title}
              minLimit={100}
              maxLimit={0}
              min={ranges[d.id].min}
              max={ranges[d.id].max}
              onApply={changeRangeHandle}
              disabled={disabled}
              isLast={i === data.length - 1}
            />
          ))}
      </div>
    </>
  );
};

export default ModelConfigBox;

const DATA = [
  { id: 'snp500', title: 'S&P 500' },
  { id: 'index1', title: 'IndexName1' },
  { id: 'index2', title: 'IndexName2' },
  { id: 'index3', title: 'IndexName3' },
];
