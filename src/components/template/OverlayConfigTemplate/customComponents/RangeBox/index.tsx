import classNames from "classnames";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent
} from "react";
import AutoSizeInput from "react-input-autosize";
import { css, useTheme, Theme } from "@emotion/react";
import { flexCenter, flexColumn, flexRow } from "@styles";
import Colors from "@styles/colors";
import * as Typography from "@styles/typography";
import * as Balloon from "@components/molecules/Balloon";
import Buttonable from "@components/atoms/Buttonable";
import { CgClose } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";

export const inlineFlexColumnCenter = css`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const rangeBarContentsWrap = (props: {
  contentsWidth: number;
  theme: Theme;
}) => css`
  ${flexColumn};
  width: ${props.contentsWidth ? `${props.contentsWidth}px` : "197px"};
  margin-top: 8px;
  border-radius: 4px;
`;

const closeIconWrapStyle = () => css`
  position: absolute;
  top: 0px;
  right: 8px;
`;

const rangeTextStyle = () => css`
  padding: 0 20px 5px 0;
  letter-spacing: 0.03em;
  font-family: "Inter";
  ${flexRow};
`;

const rangePercentTextContainerWrap = () => css`
  ${flexRow};
  padding: 0 20px 16px 0;
  color: ${Colors.rangePercentText};

  input {
    font-family: "Inter", sans-serif;
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
  font-family: "Inter";
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
  margin-top: -50px;
  padding-bottom: 22px;

  .bar,
  .bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  .bar {
    pointer-events: none;
    position: relative;
    width: 100%;
    height: 0;
    outline: none;
  }

  .bar--zindex-3 {
    z-index: 3;
    bottom: 1px;
  }

  .bar--zindex-4 {
    z-index: 4;
    bottom: -6px;
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

const rangeSliderInputStyle = () => css`
  &:first-of-type {
    bottom: -31px;
    position: relative;
  }
`;

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
  font-family: "Inter";
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
  disabled?: boolean;
  onApply?: (props: { id?: string; min: number; max: number }) => void;
}

const RangeBox = ({
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
  onApply,
  disabled,
  ...props
}: RangeSetBoxProps) => {
  const theme = useTheme();
  const nodeRef = useRef<HTMLDivElement>(null);
  const [minInput, setMinInput] = useState(min || 0);
  const [maxInput, setMaxInput] = useState(max || 50);
  const [minValue, setMinValue] = useState(min || 0); // minValue의 초기값은 0이고 onChange 걸릴 때 변화
  const [maxValue, setMaxValue] = useState(max || 50); // maxValue의 초기값은 0이고 onChange 걸릴 때 변화
  const [pressedMin, setPressedMin] = useState(false);
  const [pressedMax, setPressedMax] = useState(false);
  const firstTextRef = useRef<HTMLInputElement>(null); // maxValue의 초기값은 0이고 onChange 걸릴 때 변화
  const secondTextRef = useRef<HTMLInputElement>(null); // Range result 에 나오는 두번째 퍼센트 값에 접근하기 위한 ref
  const range = useRef<HTMLDivElement>(null);

  // 첫 번째 텍스트 타이핑 인풋에서 엔터 누르면 다음 인풋으로 focus
  const focusInputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      secondTextRef.current.focus();
    }
  };

  const focusFirstInputHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
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

  useEffect(() => {
    let handler = (event: any) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      css={[
        css`
          position: absolute;
          z-index: 999;
        `
      ]}
      ref={nodeRef}
    >
      {/* Apply 버튼 클릭 시 해당 값이 apply되는 컴포넌트 */}
      {open && (
        <Balloon.Box
          width={contentsWidth ? contentsWidth : 197}
          height={142.56}
          arrowPosition={"top"}
          arrowAlign={"center"}
        >
          <div
            css={[
              rangeBarContentsWrap({ contentsWidth: contentsWidth, theme })
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
                      const limit = Math.min(
                        +e.target.value,
                        minLimit,
                        maxValue
                      );
                      setFlag(!flag);
                      if (+minInput >= limit) {
                        setMinValue(limit);
                        return;
                      } else {
                        setMinValue(minInput);
                      }
                    }}
                    onChange={(e) => {
                      if (+e.target.value > 50) {
                        setMinInput(minInput);
                        return;
                      }
                      const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
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
                      const limit = Math.max(
                        +e.target.value,
                        maxLimit,
                        minValue
                      );
                      setFlag(!flag);
                      if (+maxInput <= limit) {
                        setMaxValue(limit);
                        return;
                      }
                      setMaxValue(maxInput);
                    }}
                    onChange={(e) => {
                      if (+e.target.value > 50) {
                        setMaxInput(50);
                        return;
                      }
                      const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
                      setMaxInput(onlyNumber);
                    }}
                  />
                  %
                </div>
                <div css={editImgWrapStyle} onClick={clickEditBtnFocusToInput}>
                  <BiEdit size={9} color="#DBDADA" />
                </div>
              </div>
              <div css={[rangeSliderContainerWrap({ theme })]}>
                <div css={rangeSliderInputStyle}>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    value={minValue}
                    onMouseDown={mousedownMinHandler}
                    onMouseUp={mouseupHandler}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const value = Math.min(
                        +event.target.value,
                        minLimit,
                        maxValue
                      );
                      setMinValue(value);
                      event.target.value = value.toString();
                    }}
                    // Thumb 의 zindex 조정하기 위한 것
                    className={classNames("bar bar--zindex-3", {
                      "bar--zindex-5": minValue > max - 50
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
                      const value = Math.max(
                        +event.target.value,
                        maxLimit,
                        minValue
                      );
                      console.log("value", value);
                      if (value > minLimit) {
                        return;
                      }

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
                        left: 0
                      }}
                    />
                  )}
                  {pressedMax && (
                    <div
                      css={[sliderRangeStyle({ theme })]}
                      style={{
                        width: `${
                          100 - Math.max(maxLimit, minValue) - minLimit
                        }%`,
                        left: `${Math.max(maxLimit, minValue)}%`
                      }}
                    />
                  )}
                  {!pressedMin && !pressedMax && (
                    <div
                      css={[sliderRangeStyle({ theme })]}
                      style={{
                        width: `${maxValue - minValue}%`,
                        left: `${minValue}%`
                      }}
                    />
                  )}
                </div>
              </div>
              <div css={applyBtnWrap}>
                <Buttonable
                  css={[applyBtnStyle({ theme })]}
                  onClick={applyingValueHandler}
                >
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

export default RangeBox;
