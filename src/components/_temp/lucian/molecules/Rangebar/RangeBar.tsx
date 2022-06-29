import Image from "next/image";
import React, {
  FC,
  useCallback,
  useRef,
  useState,
  useEffect,
  ChangeEvent
} from "react";
import {
  Container,
  Slider,
  DisabledArea,
  SliderLeftVal,
  SliderRightVal,
  RangeInput,
  RangePercentTextWrap,
  Header,
  Line,
  EditButtonWrap,
  BarWrap,
  ApplyBtnWrap
} from "./rangeBarStyle";
import { MultiRangeSliderType } from "./rangeBarType";
import RangeResultBtn from "./RangeResultBtn";

const RangeBar: FC<MultiRangeSliderType> = ({ min, max, onChange }) => {
  // min = 0으로 설정되어있음
  // minValue의 초기값은 0이고 onChange 걸릴 때 변화
  const [minValue, setMinValue] = useState(0);
  // max = 0으로 설정되어있음
  // maxValue의 초기값은 0이고 onChange 걸릴 때 변화
  const [maxValue, setMaxValue] = useState(0);

  const [applyingValue, setApplyingValue] = useState({
    startRangeNum: 0,
    endRangeNum: 0
  });

  // 퍼센트를 보여주는 텍스트의 최소값에 접근하기 위한 ref
  const minNumRef = useRef<HTMLInputElement>(null);
  // 퍼센트를 보여주는 텍스트의 최댓값에 접근하기 위한 ref
  const maxNumRef = useRef<HTMLInputElement>(null);

  // 숫자 퍼센트로 변환
  const getPercentage = useCallback(
    (value: number) => Math.round((value - min) / (max - min)) * 100,
    [min, max]
  );

  // 첫 번째 텍스트 타이핑 인풋에서 엔터 누르면 다음 인풋으로 focus
  const foucsInputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      maxNumRef.current.focus();
    }
  };

  // edit 버튼 클릭 시 첫 번째 인풋으로 focus
  const clickEditBtnFocusToInput = () => {
    minNumRef.current.focus();
  };

  const applyingValueHandler = () => {
    setApplyingValue({
      startRangeNum: minValue,
      endRangeNum: maxValue
    });
  };

  useEffect(() => {
    onChange({ min: minValue, max: maxValue });
  }, [minValue, maxValue, onChange]);

  return (
    <>
      <Container>
        <Header>Range</Header>
        <RangePercentTextWrap>
          <SliderLeftVal>
            <input
              ref={minNumRef}
              type="number"
              value={minValue}
              min={0}
              max={minValue}
              onKeyPress={foucsInputHandler}
              onChange={(e) => setMinValue(+e.target.value)}
            />
            %
          </SliderLeftVal>
          <Line>-</Line>
          <SliderRightVal>
            <input
              ref={maxNumRef}
              type="number"
              value={maxValue}
              min={0}
              max={99}
              onChange={(e) => setMaxValue(+e.target.value)}
            />
            %
          </SliderRightVal>
          <EditButtonWrap onClick={clickEditBtnFocusToInput}>
            <Image src="/img/lucian/edit.png" alt="수정" width={9} height={9} />
          </EditButtonWrap>
        </RangePercentTextWrap>
        <BarWrap>
          <Slider>
            <RangeInput
              type="range"
              min={min}
              max={30}
              value={minValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = Math.min(+event.target.value);
                setMinValue(value);
                event.target.value = value.toString();
              }}
              className="thumb thumb1"
            />
            <DisabledArea width={100} />
            <RangeInput
              type="range"
              min={60}
              max={max}
              value={maxValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = Math.max(+event.target.value);
                setMaxValue(value);
                event.target.value = value.toString();
              }}
              className="thumb thumb2"
            />
          </Slider>
        </BarWrap>
        <ApplyBtnWrap onClick={applyingValueHandler}>Apply</ApplyBtnWrap>
      </Container>
      <div>
        <RangeResultBtn
          startRangeNum={applyingValue.startRangeNum}
          endRangeNum={applyingValue.endRangeNum}
        />
      </div>
    </>
  );
};

export default RangeBar;
