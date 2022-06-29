import React, { useRef, useState, useEffect, ChangeEvent, useCallback } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { css, useTheme, Theme, SerializedStyles } from '@emotion/react';
import AutoSizeInput from 'react-input-autosize';
import { CgClose } from 'react-icons/cg';
import { BiEdit } from 'react-icons/bi';
import { flexCenter, flexColumn, flexRow } from '@styles';
import * as Typography from '../../../styles/typography';
import Colors from '../../../styles/colors';
import Buttonable from '../../atoms/Buttonable/index';
import * as Balloon from '../Balloon/index';

export const inlineFlexColumnCenter = css`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const rangeBarContentsWrap = (props: { contentsWidth: number; theme: Theme }) => css`
  ${flexColumn};
  margin-top: 8px;
  position: relative;
  border-radius: 4px;
  background-color: white;
`;

const closeIconWrapStyle = () => css`
  position: absolute;
  top: 6.91px;
  right: 5px;
  cursor: pointer;
`;

const rangeTextStyle = () => css`
  padding: 0 20px 5px 0;
  letter-spacing: 0.03em;
  font-family: 'Inter';
`;

const rangePercentTextContainerWrap = () => css`
  ${flexRow};
  padding: 0 20px 16px 0;
  color: ${Colors.rangePercentText};

  input {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.03em;
    color: ${Colors.rangePercentText};
    ${commonInputStyle}
  }
`;

const commonInputStyle = css`
  outline: none;
  border: none;
  background: none;
  width: 29px;
  margin: 0;
  padding: 0;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const sliderValueInputWrap = () => css`
  letter-spacing: 0.03em;
  font-family: 'Inter';
  ${flexRow};
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  color: ${Colors.rangePercentText};
`;

const lineStyle = () => css`
  width: 10px;
  ${flexCenter};
  padding-left: 1px;
`;

const editImgWrapStyle = () => css`
  cursor: pointer;
  padding: 3.2px 4.13px 0 0;
`;

const rangeSliderContainerWrap = (props: { theme: Theme }) => css`
  width: 100%;
  padding-bottom: 16.89px;

  .bar,
  .bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  .bar {
    pointer-events: none;
    position: absolute;
    width: calc(100% - 37px);
    height: 0;
    outline: none;
  }

  .bar--zindex-3 {
    z-index: 3;
  }

  .bar--zindex-4 {
    z-index: 4;
  }

  .bar--zindex-5 {
    z-index: 5;
  }

  /* For Chrome browsers */
  .bar::-webkit-slider-thumb {
    background-color: ${props.theme.colors.backgroundWhite};
    border: 1px solid ${props.theme.colors.primary5};
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    height: 12px;
    width: 12px;
    margin-top: 2px;
    pointer-events: all;
    position: relative;

    &:hover {
      border: 1px solid ${props.theme.colors.primary3};
    }
  }

  /* For Firefox browsers */
  .bar::-moz-range-thumb {
    background-color: ${props.theme.colors.backgroundWhite};
    border: 1px solid ${props.theme.colors.primary5};
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    height: 12px;
    width: 12px;
    cursor: pointer;
    margin-top: 2px;
    pointer-events: all;
    position: relative;
  }
`;

const rangeBarInnerWrap = () => css`
  width: calc(100% - 37px);
  padding-top: 10px;
  margin-left: 11.1%;
`;

const rangeSliderInputStyle = () => css``;

const sliderStyle = () => css`
  position: relative;
  width: 100%;
  display: flex;
`;

const sliderTrackStyle = () => css`
  width: 100%;
  height: 2px;
  position: absolute;
  border-radius: 2px;
  z-index: 1;
  background-color: ${Colors.sliderTrackBg};
`;

const sliderRangeStyle = (props: { theme: Theme }) => css`
  height: 2px;
  position: absolute;
  border-radius: 2px;
  z-index: 2;
  background-color: ${props.theme.colors.primary3};
`;

const applyBtnWrap = () => css`
  ${flexRow};
  justify-content: flex-end;
`;

const applyBtnStyle = (props: { theme: Theme }) => css`
  ${flexCenter};
  font-family: 'Inter';
  font-weight: 600;
  font-size: 9px;
  line-height: 11px;
  width: 66px;
  height: 20.56px;
  background: none;
  border: 0.5px solid ${props.theme.colors.primary5};
  border-radius: 4px;
  color: ${props.theme.colors.primary5};
`;

export interface RangeSetBoxProps {
  rowId?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  minLimit: number;
  maxLimit: number;
  contentsWidth?: number;
  boxPosition?: SerializedStyles;
  onApply?: (props: { id?: string; min: number; max: number }) => void;
}

/**
 *
 * RangeSetBox의 부모 태그에 position: relative; 적용 필요;
 */
const RangeSetBox = ({
  rowId,
  open,
  setOpen,
  min,
  max,
  minVal,
  maxVal,
  minLimit,
  maxLimit,
  contentsWidth,
  boxPosition,
  onApply,
  ...props
}: RangeSetBoxProps) => {
  const theme = useTheme();
  const [minInput, setMinInput] = useState(min || 0);
  const [maxInput, setMaxInput] = useState(max || 100);
  const [minValue, setMinValue] = useState(min || 0); // minValue의 초기값은 0이고 onChange 걸릴 때 변화
  const [maxValue, setMaxValue] = useState(max || 100); // maxValue의 초기값은 0이고 onChange 걸릴 때 변화
  const [pressedMin, setPressedMin] = useState(false);
  const [pressedMax, setPressedMax] = useState(false);
  const firstTextRef = useRef<HTMLInputElement>(null); // maxValue의 초기값은 0이고 onChange 걸릴 때 변화
  const secondTextRef = useRef<HTMLInputElement>(null); // Range result 에 나오는 두번째 퍼센트 값에 접근하기 위한 ref
  const range = useRef<HTMLDivElement>(null);

  // 첫 번째 텍스트 타이핑 인풋에서 엔터 누르면 다음 인풋으로 focus
  const focusInputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      secondTextRef.current.focus();
    }
  };

  const focusFirstInputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      firstTextRef.current.focus();
    }
  };

  // edit 버튼 클릭 시 첫 번째 인풋으로 focus
  const clickEditBtnFocusToInput = () => {
    firstTextRef.current.focus();
  };

  // Apply 버튼 클릭 시, 해당 최솟값과 최댓갑의 퍼센트를 적용시켜주는 handler
  const applyingValueHandler = () => {
    onApply && onApply({ id: rowId, min: minValue, max: maxValue });
    setOpen && setOpen(false);
  };

  // 첫번째 레인지 바 thumb을 클릭
  const mousedownMinHandler = () => {
    if (range) {
      setPressedMin(true);
    }
  };
  // 두번째 레인지 바 thumb을 클릭
  const mousedownMaxHandler = () => {
    if (range) {
      setPressedMax(true);
    }
  };
  // 레인지 바 thumb을 클릭한 마우스를 뗏을 경우
  const mouseupHandler = () => {
    if (range) {
      setPressedMax(false);
      setPressedMin(false);
    }
  };

  const closeHandle = useCallback(() => {
    setMaxValue(maxVal);
    setMinValue(minVal);
    setOpen && setOpen(false);
  }, [maxVal, minVal]);

  useEffect(() => {
    const limit = Math.max(maxInput, maxLimit, minValue);
    const limit2 = Math.min(minInput, minLimit, maxValue);
    if (maxInput < limit || minInput > limit2) return;

    setMinValue(+minInput);
    setMaxValue(+maxInput);
  }, [minInput, maxInput, maxLimit]);

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setMinInput(minValue);
    setMaxInput(maxValue);
  }, [minValue, maxValue, flag]);

  useEffect(() => {
    setMinValue(minVal);
    setMaxValue(maxVal);
  }, [minVal, maxVal]);

  return (
    <div
      css={[
        css`
          position: absolute;
          z-index: 2;
        `,
        boxPosition,
      ]}
    >
      {open && (
        <Balloon.Box
          width={contentsWidth ? contentsWidth : 197}
          height={142.56}
          arrowPosition={'top'}
          arrowAlign={'center'}
        >
          <div
            css={[
              rangeBarContentsWrap({
                contentsWidth: contentsWidth,
                theme,
              }),
            ]}
          >
            <div css={rangeBarInnerWrap}>
              <div css={closeIconWrapStyle} onClick={closeHandle}>
                <CgClose color="#DBDADA" />
              </div>
              <Typography.Base
                fontSize="10px"
                fontWeight="600"
                lineHeight="12px"
                color={Colors.rangeTitleText}
                css={rangeTextStyle}
              >
                Range
              </Typography.Base>
              <div css={rangePercentTextContainerWrap}>
                <div css={sliderValueInputWrap}>
                  <AutoSizeInput
                    ref={firstTextRef}
                    value={minInput}
                    maxLength={3}
                    placeholderIsMinWidth
                    onKeyPress={focusInputHandler}
                    onBlur={(e) => {
                      const limit = Math.min(+e.target.value, minLimit, maxValue);
                      setFlag(!flag);
                      if (+minInput >= limit) {
                        setMinValue(limit);
                        return;
                      } else {
                        setMinValue(minInput);
                      }
                    }}
                    onChange={(e) => {
                      if (+e.target.value > 100) {
                        setMinInput(minInput);
                        return;
                      }
                      const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
                      setMinInput(onlyNumber);
                    }}
                  />
                  %
                </div>
                <div css={lineStyle}>-</div>
                <div css={sliderValueInputWrap}>
                  <AutoSizeInput
                    ref={secondTextRef}
                    value={maxInput}
                    maxLength={3}
                    placeholderIsMinWidth
                    onKeyPress={focusFirstInputHandler}
                    onBlur={(e) => {
                      const limit = Math.max(+e.target.value, maxLimit, minValue);
                      setFlag(!flag);
                      if (+maxInput <= limit) {
                        setMaxValue(limit);
                        return;
                      }
                      setMaxValue(maxInput);
                    }}
                    onChange={(e) => {
                      if (+e.target.value > 100) {
                        setMaxInput(100);
                        return;
                      }
                      const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
                      setMaxInput(onlyNumber);
                    }}
                  />
                  %
                </div>
                <div css={editImgWrapStyle} onClick={clickEditBtnFocusToInput}>
                  <BiEdit size={9} color="#DBDADA" />
                </div>
              </div>
              <div
                css={[
                  rangeSliderContainerWrap({
                    theme,
                  }),
                ]}
              >
                <div css={rangeSliderInputStyle}>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    value={minValue}
                    onMouseDown={mousedownMinHandler}
                    onMouseUp={mouseupHandler}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const value = Math.min(+event.target.value, minLimit, maxValue);
                      setMinValue(value);
                      event.target.value = value.toString();
                    }}
                    // Thumb 의 zindex 조정하기 위한 것
                    className={classNames('bar bar--zindex-3', {
                      'bar--zindex-5': minValue > max - 100,
                    })}
                  />
                </div>
                <div css={rangeSliderInputStyle}>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxValue}
                    onMouseDown={mousedownMaxHandler}
                    onMouseUp={mouseupHandler}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const value = Math.max(+event.target.value, maxLimit, minValue);
                      setMaxValue(value);
                      event.target.value = value.toString();
                    }}
                    className="bar bar--zindex-4"
                  />
                </div>
                <div css={sliderStyle}>
                  <div css={sliderTrackStyle} />
                  {pressedMin && (
                    <div
                      css={[sliderRangeStyle({ theme })]}
                      style={{
                        width: `${Math.min(minLimit, maxValue)}%`,
                        left: 0,
                      }}
                    />
                  )}
                  {pressedMax && (
                    <div
                      css={[sliderRangeStyle({ theme })]}
                      style={{
                        width: `${100 - Math.max(maxLimit, minValue)}%`,
                        left: `${Math.max(maxLimit, minValue)}%`,
                      }}
                    />
                  )}
                  {!pressedMin && !pressedMax && (
                    <div
                      css={[sliderRangeStyle({ theme })]}
                      style={{
                        width: `${maxValue - minValue}%`,
                        left: `${minValue}%`,
                      }}
                    />
                  )}
                </div>
              </div>
              <div css={applyBtnWrap}>
                <Buttonable css={[applyBtnStyle({ theme })]} onClick={applyingValueHandler}>
                  Apply
                </Buttonable>
              </div>
            </div>
          </div>
        </Balloon.Box>
      )}
    </div>
  );
};

export default RangeSetBox;