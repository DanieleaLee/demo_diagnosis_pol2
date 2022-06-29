import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { RiCloseCircleFill } from 'react-icons/ri';
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
  rowData: { id: string; title: string }[];
  onSubmit?: (rangeData: any) => void;
};
const ModelConfigBox = ({ disabled, rowData, onSubmit }: ModelConfigBoxProps) => {
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
    <>
      {/* valid test 영역 추후 삭제 */}
      {/* <div
        css={css`
          margin-bottom: 10px;
        `}
      >
        <button onClick={() => setTotalRanges({ min: 25, max: 40 })}>valid</button>
        <button onClick={() => setTotalRanges({ min: 30, max: 40 })}>only minSum invalid</button>
        <button onClick={() => setTotalRanges({ min: 5, max: 10 })}>only maxSum invalid</button>
        <button onClick={() => setTotalRanges({ min: 50, max: 15 })}>minSum and maxSum invalid</button>
      </div> */}
      {/* valid test 영역 */}
      <BasicBox
        width={304}
        height={463}
        borderColor="#CED9E1"
        scrollGap={13}
        paddingTop={10}
        paddingBottom={10}
        paddingLeft={30}
        paddingRight={30}
        isScroll
      >
        {data && (
          <ModelConfigRangeRow
            rowId={'total'}
            title={'Total'}
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
    </>
  );
};

export default ModelConfigBox;
